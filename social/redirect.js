const destination = new URL('../lucifer0/', location.href);
destination.search = location.search;
destination.hash = location.hash;
document.getElementById('destination').href = destination.href;
location.replace(destination.href);
