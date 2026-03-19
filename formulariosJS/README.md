# Portafolio-de-Proyectos
Esta es una librería de proyectos personales, donde me encargo de realizar software dirigido a la atención del cliente.

# Proyecto APEX es un aplicativo web que funciona para el registro de usuariso, compra de autos y generación de facturas
# Tecnologías Aplicadas:

***********
# Back-End
***********
Python & MongoDB

***********
# Front-End
***********
JavaScript,Css & HTML


**********************
# Ejecucción de Knight
**********************

1. docker rm -f servidor-final 
2. docker build -t servidor-final .
3. docker run -d --name servidor-final -p 3000:3000 --network knight-red servidor-final
4. docker logs -f servidor-final
5. Ingresar a http://localhost:3000/inicio.html