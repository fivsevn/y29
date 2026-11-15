---
id: "l0-20261115140203-6eed42f5-2c6c50f151bf"
author: "guest-4fa3159e3d123b4a"
createdAt: "2026-11-15T12:46:25.328Z"
replyTo: null
likes: 0
canon: "derivative"
media: []
guest: {"name":"拾柒8716"}
---

HC-SR04 测出来的距离不对

想求助一下，我的 HC-SR04 显示的距离不对，不管物体离得近还是远，读出来都是这样：

```text
Distance: 992 cm
Distance: 993 cm
Distance: 992 cm
Distance: 992 cm
Distance: 994 cm
Distance: 993 cm
Distance: 993 cm
```

代码是这个：

```cpp
const int trigPin = 11;
const int echoPin = 10;

long duration;
long distance;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

}

void loop() {

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH, 100000);
  distance =  duration*0.034/2;
  Serial.print("Distance : ");
  Serial.print(distance);
  Serial.println(" cm ");
  delay(500);
}
```
