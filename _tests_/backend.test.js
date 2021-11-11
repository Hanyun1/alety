const app = require("../server");
const request = require('supertest');
const jwt = require("jsonwebtoken");
const config = require("config");

jest.setTimeout(10000)

describe("Backend function run successfully", () => {
    const userData = {
        username:"te14bc",
        emailAddress:"u1w46s@test.com",
        password:"a23456"
    }

    test("signup and get token", async()=>{
        const response = await request(app)
                                    .post("/api/user/signup")
                                    .send(userData)
        expect(response.text).toContain("token")
        token = response.body.token;
    })

    test("create 2 user with same email error", async()=>{
        const response = await request(app)
        
        .post("/api/user/signup")
        .set("x-auth-token", token)
        .send(userData)
        
        expect(response.statusCode).toBe(400)
        expect(response.text).toContain("User already exists")
        
    })

    test("signin", async()=>{
        const response = await request(app)
                                    .post("/api/signin")
                                    .set("x-auth-token", token)
                                    .send({emailAddress:userData.emailAddress,
                                           password:userData.password})
        expect(response.text).toContain("token")
    })

    test("get user by email address", async()=>{
       
        const response = await request(app)
                                .get("/api/user/" + userData.emailAddress)
                                .set("x-auth-token", token)

        const body = response.body
        expect(body.username).toBe(userData.username)
        expect(body.emailAddress).toBe(userData.emailAddress)
        expect(response.statusCode).toBe(200)
    })

    test("edit user information", async()=>{
        const newData ={  
            fullname: "t76gd",
            gender:"woman",
            age:9,
            address:"asd3",
            phoneNumber:"2344542",
            description:"asd33fa",
            birthday:"2020-10-07T00:00:00.000Z"
        }

        const response = await request(app)
                                .put("/api/user")
                                .set("x-auth-token", token)
                                .send(newData)

        const body = response.text
        expect(body).toContain("User's information edit successfully")
        expect(response.statusCode).toBe(200)
    })

    test("delete user", async()=>{
        const response = await request(app)
                                .delete("/api/user/")
                                .set("x-auth-token", token)
        
        const body = response.text
        expect(body).toContain("deleted user")
        expect(response.statusCode).toBe(200) 
    })

})

describe("contact function run successfully", () => {

    var contactid;
    var token;
    const contactData = {  
        star: false, 
        fullname: "tame",
        uid: null,
        emailAddress: "13fa@tst.com",
        gender:"man",
        age:4,
        address:"asd",
        phoneNumber:"234542",
        description:"asdfa",
        birthday:"2020-10-04T00:00:00.000Z"
    }

    test("login and get token", async()=>{
        const response = await request(app).post("/api/signin").send({
            emailAddress:"contest@test.com",
            password:"a23456"
        })
        expect(response.text).toContain("token")
        token = response.body.token;
        contactData.uid = jwt.verify(token, config.get("jwtSecret")).user.id;


    })

    test("cannot find such contact error", async()=>{
       
        const response = await request(app)
                                .get("/api/contact/" + contactData.uid)
                                .set("x-auth-token", token)
                              
        expect(response.statusCode).toBe(400)
        expect(response.text).toContain("There is no such contact")
    })

    test("create contact", async()=>{
        const response = await request(app)
        
        .post("/api/contact/create")
        .set("x-auth-token", token)
        .send(contactData)
        
        const body = response.text
        expect(body).toContain('_id')
        expect(body).toContain('star')
        expect(body).toContain('fullname')
        expect(body).toContain('uid')
        expect(body).toContain('emailAddress')
        expect(body).toContain('gender')
        expect(body).toContain('age')
        expect(body).toContain('address')
        expect(body).toContain('phoneNumber')
        expect(body).toContain('description')
        expect(body).toContain('birthday')
        expect(body).toContain('insertDate')
        expect(response.statusCode).toBe(200)
        
        contactid = response.body._id  
        
    })

    test("create 2 same contact error", async()=>{
        const response = await request(app)
        
        .post("/api/contact/create")
        .set("x-auth-token", token)
        .send(contactData)
        
        expect(response.statusCode).toBe(400)
        expect(response.text).toContain("Contact already exists")
        
    })

    test("get 1 contact by id", async()=>{
       
        const response = await request(app)
                                .get("/api/contact/" + contactid)
                                .set("x-auth-token", token)

        const body = response.body
        expect(body.fullname).toBe(contactData.fullname)
        expect(body.emailAddress).toBe(contactData.emailAddress)
        expect(body.gender).toBe(contactData.gender)
        expect(body.age).toBe(contactData.age)
        expect(body.address).toBe(contactData.address)
        expect(body.phoneNumber).toBe(contactData.phoneNumber)
        expect(body.description).toBe(contactData.description)
        expect(body.birthday).toBe(contactData.birthday)
        expect(response.statusCode).toBe(200)
    })

    test("get user's all contact", async()=>{
       
        const response = await request(app)
                                .get("/api/contact/")
                                .set("x-auth-token", token)

        expect(response.type).toBe('application/json')
        expect(response.statusCode).toBe(200)
    })


    test("edit contact", async()=>{
        const newData ={  
            fullname: "t76gd",
            emailAddress: "aaaaaa@tst.com",
            gender:"woman",
            address:"asd3",
            phoneNumber:"2344542",
            description:"asd33fa",
            birthday:"2020-10-07T00:00:00.000Z"
        }

        const response = await request(app)
                                .put("/api/contact/" + contactid)
                                .set("x-auth-token", token)
                                .send(newData)

        const body = response.body
        expect(body.fullname).toBe(newData.fullname)
        expect(body.emailAddress).toBe(newData.emailAddress)
        expect(body.gender).toBe(newData.gender)
        expect(body.phoneNumber).toBe(newData.phoneNumber)
        expect(body.description).toBe(newData.description)
        expect(body.birthday).toBe(newData.birthday)
        expect(response.statusCode).toBe(200)
    })

    test("star/unstar contact", async()=>{
        const newData ={  
            star: true
        }

        const response = await request(app)
                                .put("/api/contact/star/" + contactid)
                                .set("x-auth-token", token)
                                .send(newData)

        expect(response.body.star).toBe(newData.star)
        expect(response.statusCode).toBe(200)
    })

    test("delete contact", async()=>{
        const response = await request(app)
                                .delete("/api/contact/"+ contactid)
                                .set("x-auth-token", token)
        
        const body = response.text
        expect(body).toContain('id')
        expect(body).toContain('success')
        expect(response.statusCode).toBe(200) 
    })

    test("delete not found contact error", async()=>{
        const response = await request(app)
                                .delete("/api/contact/"+ contactid)
                                .set("x-auth-token", token)
        
        expect(response.statusCode).toBe(400) 
        expect(response.text).toContain("Contact not found")
    })
    

})
describe('test :event', () =>{
    var eventid;
    var token;
    var uid;
    var email = "test@test.com"
    test("login and get token", async()=>{
        const response = await request(app).post("/api/signin").send({
            emailAddress:"test@test.com",
            password:"de7412369"
        })
        expect(response.text).toContain("token")
        token = response.body.token;
        uid = jwt.verify(token, config.get("jwtSecret")).user.id;
    })
    test('create a event', async ()=>{
        const response = await request(app).post("/api/event/create").set("x-auth-token",token).send({
            star:false,
            eventname:"hi",
            Address: "uni",
            remainder:"test for unit test",
            eventTime: "2021-11-02 16:50",
            peoplewith:"Tom,Tommy",
        })
        expect(response.statusCode).toBe(200)
        eventid = response.body._id;
    })
    test('get one event',() =>{
        return request(app)
        .get('/api/event/618a6b2a7f612a88ce2ffd39')//one event
        .set("x-auth-token",token)
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.text).toContain('_id":"618a6b2a7f612a88ce2ffd39');
        })
    });
    
    test('get all event',() =>{
        return request(app)
        .get('/api/event')
        .set("x-auth-token",token)
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
        })
    })
    test("update event", async () =>{
        const response = await request(app).put('/api/event/update/618a6b2a7f612a88ce2ffd39').set("x-auth-token",token).send({
            star:true,
            eventname:"hi",
            Address: "uni",
            remainder:"test for unit test",
            eventTime: "2021-10-05 16:50",
            peoplewith:"Tom,Ang",
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toContain("update event successfully")
    })
    test('get one event with error',() =>{
        return request(app)
        .get('/api/event/615d48b9ac63378365fb6476')//one event
        .set("x-auth-token",token)
        .then((response)=>{
            expect(response.statusCode).toBe(404);
            //expect(response.type).toBe('application/json');
            expect(response.text).toContain('Event not found');
        })
    });

});