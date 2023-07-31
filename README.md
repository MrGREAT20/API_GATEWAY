FRONTEND -- MIDDLE_END -- BACKEND

why can't FRONTEND directly talk with BACKEND ?

- We need an intermediate layer between the client side and the microservices
- Using this middle_end, when client sends request we will be able to make decisions that which microservice should actually respond to this request
- We can do message validation, response transformation, rate limiting
- We try to prepare an API Gateway that acts as this middle_end.
- Why we need it ?  We cant check the request eligibility in each microservice and that too in big numbers, like we dont want to check if a request directed towards
    a SERVICE A is eligile or valid to be directed to SERVICE A in that service itself (i.e we dont want to write an extra logic to check that in that microservice)

- Microservice's sole purpose should be to execute the task they are provided with 

- We dont want user to go on 'localhost:3000' or 'localhost:3001' or ..., we dont want user to manually go to this microservices rather than it will be API GATEWAY's task. we can do this using proxy middleware package
- User should only make a call to API GATEWAY and rest will be handled by API GATEWAY
