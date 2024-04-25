                            Escencial

Base de datos (Tablas, llaves foraneas, disparadores, etc)
Interfaz grafica (HTML,JS,CSS,...)
Arduino (Codigo,...)



                            ARQUITECTURA DE...

    Base de datos (Tablas, llaves foraneas,...)
    planta {
    id_planta
    nombre
    nombre_del_propietario
    tipo_de_planta => flor, arbol,cultivo,etc....
    }
    horario_riego{ => grabara solo y cuando se active la bomba de riego y a que planta fue...
        id_riego
        fk_planta => se obtiene de la tabla planta
        fk_planta_nombre => se obtiene de la tabla planta
        fk_tipo_de_planta => se obtiene de la tabla planta
        fecha_riego
        hora_riego
    }

    
    Interfaz grafica (HTML,JS,CSS,...)
    HTML { SIEMPRE EL MENU ARRIBA DE TODAS LAS PAGINAS [*Inicio(index.html) * Menu[registro de planta(pagina), mis plantas(pagina), agenda de riego de mis plantas(pagina)]
]
        Pagina_1[INICIO] = {
            * Menu[registro de planta(pagina), mis plantas(pagina), agenda de riego de mis plantas(pagina)]
            * Que es esta pagina
            IMAGEN
            * Como usarla
            IMAGEN
            *Pie de pagina
        }
        Pagina_2[Registro_planta] = {
            forms{
            * Nombre del propietario de la planta
            * Nombre de la planta
            * Tipo de planta [arbol,arbusto,hierbas,plantas suculentas,plantas trepadoras,higuerones, helechos, musgos, hepáticas,insectivoras] => recomendar pagina en tal caso que no saben de que tipo de planta se regara(pagina)
            *Boton subir

            *Nota: se podran editar estos valores despues del registro por si tiene un error en ello.
            }
        }
        Pagina_3[Tipo_de_planta] = {
            Informacion de los tipos de planta y como poder diferenciarlos
        }
        Pagina_4[Mis_plantas]{
            Imagen
            *Informacion de la planta[numero de planta, Nombre de planta, Tipo de planta, propietario de la planta]
            *Boton de eliminar => arrojara alerta si de verdad desea eliminar esta planta y boton de confirmacion
            *Boton de ediar (pagina)
        }
        Pagina_5[Editar_planta] = {
            recuperara la informacion de la planta:
            *Nombre de planta
            *Nombre del propietario
            *Tipo de planta

            *Boton de actualizacion => arrojara la informacion de la planta actualizada y modificara la informacion de la planta en la base de datos en la tabla de planta DB, regresando a la pagina de 'Mis_plantas' con la informacion de la planta actualizada
        }
        Pagina_6[Agenda_de_riego_de_mis_plantas] = {
            recuperara la informacion de la planta => tabla planta de DB:
            *Nombre de planta
            *Nombre del propietario
            *Tipo de planta

            agregandola en una tabla donde registrara le fecha y hora de riego (se activo la bomba hasta conseguir cierto porcentaje de humedad de riego)
        }
    }
    