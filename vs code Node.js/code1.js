var http=require('http');
var formidable=require('formidable');
http.createServer(function(req,res)
{
    if(req.url=='/fileupload')
    {
        var form=new formidable.IncomingForm();
        form.parse(req,function(err,fields,files)
        {
            res.write('file uploaded');
            console.log(files);
            res.end();
        });
    }
        else
        {
            res.writeHead(200,{'content-Type':'teext/html'});
            res.write('<form action="fileuploaded" method="post" enctype="multipart/form.data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit');
            res.write('</form>');
            return res.end();
        }
    }).listen(8080);