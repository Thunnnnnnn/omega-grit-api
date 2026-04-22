## 📌 Project Overview
ระบบสำหรับจองคิวอาบน้ำและตัดขนสัตว์
ผู้ใช้สามารถสมัครสมาชิก, เข้าสู่ระบบ, และจองคิวได้

## Project setup

ติดตั้งแพคเกจของโปรเจคนี้

```
npm install
```

### Setup .env

สร้างไฟล์ .env ใน root ของโปรเจค และกำหนดค่า:

```
PORT=
DATABASE_URL=
JWT_SECRET=
```

### Init database สำหรับโปรเจคนี้

```
docker-compose up -d
```



### รันโปรแกรมในโหมด Development:

```
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Base URL -> [http://localhost:8080/api](http://localhost:8080/api) 

สามารถทดสอบได้ผ่าน Postman ได้

## Route Path

#### Authentication

[POST]`/auth/login` -> api นี้สำหรับ login เข้าสู่ระบบ โดยจะต้องสร้าง account ขึ้นมาก่อน

```
JSON
{
  "email": "test@mail.com",
  "password": "123456"
}
```

#### User

[GET]`/user` -> api นี้สำหรับการขอข้อมูล user ทั้งหมดในระบบ

[GET]`/user/:id` -> api นี้สำหรับการขอข้อมูล user โดยใช้ id ของ user ในการขอข้อมูล

[POST]`/user` -> api นี้สำหรับการสร้างข้อมูล user โดยจะใช้ email (string, email format), password (string, min legnth (6)), firstname (string), lastname (string) และ phone (string, min length(10))

```
JSON
{
  "email": "test@mail.com",
  "password": "123456",
  "firstname": "John",
  "lastname": "Doe",
  "phone": "0911111111"
}
```

[PUT]`/user/:id` -> api นี้สำหรับการอัพเดทข้อมูล user โดยใช้ id ของ user เพื่ออัพเดทข้อมูล email (string, email format), firstname (string), lastname (string), phone (string)

```
JSON
{
  "email": "test@mail.com",
  "firstname": "John",
  "lastname": "Doe",
  "phone": "0911111111"
}
```

[DELETE]`/user/:id` -> api นี้สำหรับลบข้อมูล user โดยใช้ id ของ user ในการลบข้อมูล user และต้องใช้รหัสผ่านในการยืนยันการลบบัญชี

[POST]`/user/:id/change-password` -> api นี้สำหรับการเปลี่ยนรหัส user โดยจะใช้ currentPassword (string) และ newPassword (string, min length (6))

```
JSON
{
  "currentPassword": "123456",
  "newPassword": "123456"
}
```

#### Queue

[GET]`/queue` -> api นี้สำหรับการขอข้อมูลการจองคิวทั้งหมดในระบบ

[GET]`/queue/:id` -> api นี้สำหรับการขอข้อมูลการจองคิว โดยใช้ id ของคิว

[POST]`/queue` -> api นี้สำหรับการสร้างข้อมูลการจองคิว โดยใช้ userId (integer), typeOfAnimalId (integer), typeOfQueueId (integer) และ meetTime (string, ISO 8601 datetime)

```
JSON
{
  "userId": 1,
  "typeOfAnimalId": 2,
  "typeOfQueueId": 1,
  "meetTime": "2026-04-18T10:00:00Z"
}
```

[PUT]`/queue/:id` -> api นี้สำหรับการอัพเดทข้อมูลการจองคิว โดยใช้ id ของคิวเพื่ออัพเดทข้อมูล typeOfAnimalId (integer), typeOfQueueId (integer) และ meetTime (string, ISO 8601 datetime)

```
JSON
{
  "typeOfAnimalId": 2,
  "typeOfQueueId": 1,
  "meetTime": "2026-04-18T10:00:00Z"
}
```

[DELETE]`/queue/:id` -> api นี้สำหรับการลบข้อมูลการจองคิว โดยใช้ id ของคิว

[GET]`/queue/user/:userId` -> api นี้สำหรับการขอข้อมูลการจองคิวทั้งหมดของ user คนนั้น

[GET]`/queue/date` -> api นี้สำหรับการขอข้อมูลคิวทั้งหมดของวัน โดยใช้ date (string, ISO 8601 date)

```
JSON
{
  "date": "2026-04-20"
}
```

#### Type of animal (Master data)

[GET]`/type-of-animal` -> api นี้สำหรับการขอข้อมูลประเภทของสัตว์ทั้งหมดในระบบ

[GET]`/type-of-animal/:id` -> api นี้สำหรับการขอข้อมูลประเภทของสัตว์ โดยใช้ id ของประเภทของสัตว์

[POST]`/type-of-animal` -> api นี้สำหรับการสร้างข้อมูลประเภทของสัตว์ โดยใช้ name (string)

```
JSON
{
  "name": "Cat"
}
```

[PUT]`/type-of-animal/:id` -> api นี้สำหรับการอัพเดทข้อมูลประเภทของสัตว์ โดยใช้ id ของประเภทของสัตว์เพื่ออัพเดทข้อมูล name(string)

```
JSON
{
  "name": "Cat"
}
```

[DELETE]`/type-of-animal/:id` -> api นี้สำหรับการลบข้อมูลประเภทของสัตว์ โดยใช้ id ของประเภทของสัตว์

#### Type of queue (Master data)

[GET]`/type-of-queue` -> api นี้สำหรับการขอข้อมูลประเภทของการจองคิวทั้งหมดในระบบ

[GET]`/type-of-queue/:id` -> api นี้สำหรับการขอข้อมูลประเภทของการจองคิว โดยใช้ id ของประเภทของการจองคิว

[POST]`/type-of-queue` -> api นี้สำหรับการสร้างข้อมูลประเภทของการจองคิว โดยใช้ name (string)

```
JSON
{
  "name": "Bathing animal"
}
```

[PUT]`/type-of-queue/:id` -> api นี้สำหรับการอัพเดทข้อมูลประเภทของการจองคิว โดยใช้ id ของประเภทของการจองคิวเพื่ออัพเดทข้อมูล name(string)

```
JSON
{
  "name": "Bathing animal"
}
```

[DELETE]`/type-of-queue/:id` -> api นี้สำหรับการลบข้อมูลประเภทของการจองคิว โดยใช้ id ของประเภทของการจองคิว
