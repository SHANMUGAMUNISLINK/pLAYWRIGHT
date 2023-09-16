import {test, expect} from '@playwright/test'

test.describe.parallel('Api Requests',()=>{
    const baseUrl = 'http://localhost:3000/api'
      
 test('Requests', async({request})=>{
const response = await request.get(`${baseUrl}/getall`) 
expect(response.status()).toBe(200) 
const responseBody = await response.json() 
console.log(responseBody)

})

test('Post method', async ({ request }) => {
    const response = await request.post(`${baseUrl}/post`, {
      data:{
        age:
           }
    });
    const responseBody = await response.json() 
    console.log(responseBody) 
});




})
