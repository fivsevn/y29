import {applyComments} from '../../storyteller/transmission.js';
export default async function sync({github,context}) {
  const {owner,repo} = context.repo;
  const comments=[];
  let after=null;
  do {
    const result=await github.graphql(`query($owner:String!,$repo:String!,$after:String){repository(owner:$owner,name:$repo){discussion(number:1){comments(first:100,after:$after){nodes{id databaseId body createdAt author{login}} pageInfo{hasNextPage endCursor}}}}}`,{owner,repo,after});
    const page=result.repository.discussion.comments;
    for(const c of page.nodes){
      comments.push({id:c.databaseId,body:c.body,createdAt:c.createdAt,author:c.author?.login || 'ghost'});
      let replyAfter=null;
      do {
        const result=await github.graphql(`query($id:ID!,$after:String){node(id:$id){... on DiscussionComment{replies(first:100,after:$after){nodes{databaseId body createdAt author{login}} pageInfo{hasNextPage endCursor}}}}}`,{id:c.id,after:replyAfter});
        const replies=result.node.replies;
        comments.push(...replies.nodes.map(r=>({id:r.databaseId,body:r.body,createdAt:r.createdAt,author:r.author?.login || 'ghost'})));
        replyAfter=replies.pageInfo.hasNextPage ? replies.pageInfo.endCursor : null;
      }while(replyAfter);
    }
    after=page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  }while(after);
  // Include the triggering comment even if GraphQL has not caught up yet.
  if(context.eventName==='discussion_comment'){
    const c=context.payload.comment;
    comments.push({id:c.id,body:c.body,createdAt:c.created_at,author:c.user.login});
  }
  for(let attempt=0;attempt<5;attempt++){
    const {data:file}=await github.rest.repos.getContent({owner,repo,path:'storyteller/current.json',ref:context.payload.repository.default_branch});
    const previous=JSON.parse(Buffer.from(file.content,'base64').toString('utf8'));
    const next=applyComments(previous,comments);
    if(JSON.stringify(previous)===JSON.stringify(next)) return;
    try {
      await github.rest.repos.createOrUpdateFileContents({owner,repo,path:'storyteller/current.json',branch:context.payload.repository.default_branch,sha:file.sha,
        message:'Update STORYTELLER current transmission',content:Buffer.from(JSON.stringify(next,null,2)+'\n').toString('base64')});
      return;
    }catch(error){if(![409,422].includes(error.status)||attempt===4)throw error;}
  }
}
