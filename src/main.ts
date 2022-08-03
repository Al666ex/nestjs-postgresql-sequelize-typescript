import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.modeule"


async function start(){
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
    .setTitle('BACKEND')
    .addTag('BackEnd for begginer')
    .setDescription('Documentation REST API')    
    .setVersion('version 1.0')   
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);


    app.listen(PORT, () => console.log(`Server started at port = http://localhost:${PORT}`))

}

start()