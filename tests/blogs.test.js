const Page = require('./helpers/page');

let page;

beforeEach( async () => {
    page = await Page.build()
    await page.goto('http://localhost:3000')
});

afterEach( async () => {
    await page.close()
});

/*test('when logged in, can see blog create from', async () => {

    await page.login()
    await page.click('a.btn-floating')

    const label = await page.getContentsOf('form label')

    expect(label).toEqual('Blog Title');

})*/


describe('When logged in', () => {

    beforeEach(async ()=>{
        await page.login()
        await page.click('a.btn-floating')
    })

    test('can see blog create form', async () => {

        const label = await page.getContentsOf('form label')
        expect(label).toEqual('Blog Title');
    })


    describe('And using valid inputs', () => {

        beforeEach(async () => {
            await page.type('.title input', 'My Title')
            await page.type('.content input', 'My Content')
            await page.click('form button')
        })

        test('Submitting takes user to review screen', async () => {
            const text = await page.getContentsOf('h5')
            expect(text).toEqual('Please confirm your entries')

        })

        test('Submittin then saving adds blog to index page', async () => {
            await page.click('button.green')
            await page.waitFor('.card')

            const title = await page.getContentsOf('.card-title')
            const content = await page.getContentsOf('p')

            expect(title).toEqual('My Title')
            expect(content).toEqual('My Content')

        })

    })

    describe('And using invalid input', () => {

        beforeEach(async () => {
            await page.click('form button')
        })

        test('the form shows an error message', async () => {

            const titleError = await page.getContentsOf('.title .red-text')
            const contentError = await page.getContentsOf('.content .red-text')

            expect(titleError).toEqual('You must provide a value')
            expect(contentError).toEqual('You must provide a value')
            
        })

    })

})



describe('When not logged in', () => {

    actions = [
        {
            method: 'get',
            path: '/api/blogs'
        },
        {
            method: 'post',
            path: '/api/blogs',
            data: {
                title: 'T',
                content: 'C'
            }
        }
    ]

  /*  test('User cannot create blog posts', async () => {

        const result = await page.post('/api/blogs', {title: 'T', content: 'C'})

        console.log(Object.getOwnPropertyNames(result))
        //expect(result).toEqual({"error":"You must log in!"})
    })

    test('User cannot access blog list', () => {

        const result =  page.evaluate(
             () => {
                var temp = fetch('/api/blogs',
                {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },             
                })//.then(val => { setTimeout(() => {}, 4000); val.statusText })
                setTimeout(() => {console.log('waiting 1')}, 30000)
                return temp;
            }
        )
        console.log('testing....')
        console.log(result)
        //expect(result).toEqual({"error":"You must log in!"})
    })

   test('Blog related acitons are prohibited', async () => {

       const results = await page.execRequests(actions);

       for(result of results){
        console.log(result)
        //expect(result).toEqual({"error":"You must log in!"})
       }

    })*/

})