const http = require('http')
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const index =(fs.readFileSync('index.html','utf-8'))
const products = data.products;

const server = http.createServer(( req, res) => {
    console.log(req.url, req.method);
    if(req.url.startsWith('/product')){
        const id = req.url.split('/')[2]
        const product = products.find(p => p.id === (+id))// + convert the number into string
        console.log(product)
            res.setHeader('content-type','text/html')
            const modifiedIndex = index.replace('***Title***', product.title)
            .replace('**url**', product.thumbnail)
            .replace('**rating**', product.rating)
            .replace('**price**', product.price)
            .replace('**discount**', product.discountPercentage);
            res.end(modifiedIndex);
            return;
    }

    switch(req.url){
        case "/":
            res.setHeader('content-type', 'text/html');
            res.end(index);
            break;
        case "/api":
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(data));
            break;
        default:
            res.writeHead(404);
            res.end('NOT FOUND');
    }
    res.setHeader('dummy','dummyValue');
    
    res.end(index);
    // res.end(data);
})
server.listen(8080);