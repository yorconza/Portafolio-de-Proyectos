from datetime import datetime
import random
from flask import Flask, jsonify, abort, make_response, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

def conectionDB():
    conex = MongoClient(host=['127.0.0.1:27017'], username='admin', password='secret')
    #conex = MongoClient(host=['127.0.0.1:27017'])
    conexdb = conex.Agencia
    return conexdb

def token():
    ahora = datetime.now()
    antes = datetime.strptime("1970-01-01", "%Y-%m-%d")
    return str(hex(abs((ahora - antes).seconds) * random.randrange(10000000)).split('x')[-1]).upper()


#Control de errores
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad request.....!'}), 400)

@app.errorhandler(401)
def bad_request(error):
    return make_response(jsonify({'error': ' Unauthoirized.....!'}), 401)

@app.errorhandler(403)
def forbiden(error):
    return make_response(jsonify({'error': 'Forbidden....!'}), 403)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found....!'}), 404)

@app.errorhandler(500)
def not_found(error):
    return make_response(jsonify({'error': 'Internal Server Error....!'}), 500)

@app.route('/cliente', methods=['POST'])
def add_user():
    info = request.get_json()
    error = "Faltan datos o los datos estan vacios"

    if not info:
        return jsonify(error), 400

    infoUser = ["nombre", "apellido", "direccion", "cedula", "licencia", "telefono"]

    for needed in infoUser:
        if needed not in info or info[needed] == '':
            return jsonify(error), 400

    idClientes = token()

    cliente = {
        "_id": idClientes,
        "nombre": info.get('nombre'),
        "apellido": info.get('apellido'),
        "direccion": info.get('direccion'),
        "cedula": info.get('cedula'),
        "licencia": info.get('licencia'),
        "telefono": info.get('telefono')
    }

    try:
        conex = conectionDB()
        conex.Clientes.insert_one(cliente)
        data = {
            "status_code": 201,
            "status_message": "Usuario registrado correctamente",
            "data": {'user': cliente}
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 201

@app.route('/auto', methods=['POST'])
def add_carro():
    infoI = request.get_json()
    error = "Faltan datos o los datos estan vacios"

    if not infoI:
        return jsonify(error), 400

    infoCarro = ["marca", "modelo", "año", "tipo", "traccion", "cilindraje", "precio", "stock"]

    for needed in infoCarro:
        if needed not in infoI or infoI[needed] == '':
            return jsonify(error), 400

    idCarro = token()

    Carro = {
        "_id": idCarro,
        "marca": infoI.get("marca"),
        "modelo": infoI.get("modelo"),
        "año": infoI.get("año"),
        "traccion": infoI.get("traccion"),
        "cilindraje": infoI.get("cilindraje"),
        "precio": infoI.get("precio"),
        "stock": infoI.get("stock")
    }

    try:
        conex = conectionDB()
        conex.Vehiculos.insert_one(Carro)
        data = {
            "status_code": 201,
            "status_message": "Auto registrado correctamente",
            "data": {'user': Carro}
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 201

@app.route('/factura', methods=['POST'])
def facturas():
    infoF = request.get_json()
    error = "Faltan datos o los datos estan vacios"

    if not infoF:
        return jsonify(error), 400

    infoFactura = ["cliente_id", "auto_id","marca", "descuento"]

    for needed in infoFactura:
        if needed not in infoF or infoF[needed] == '':
            return jsonify(error), 400

    try:
        conex = conectionDB()

        auto = conex.Vehiculos.find_one({"_id": infoF.get("auto_id")})

        if not auto or auto["stock"] <= 0:
            return jsonify("Auto no disponible"), 400

        subtotal = auto["precio"]
        impuesto = subtotal * 0.13
        descuento = subtotal * (infoF.get("descuento") / 100)
        total = subtotal + impuesto - descuento

        factura = {
            "_id": token(),
            "cliente_id": infoF.get("cliente_id"),
            "auto_id": infoF.get("auto_id"),
            "marca" : infoF.get("marca"),
            "fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "subtotal": subtotal,
            "impuesto": round(impuesto, 2),
            "descuento": round(descuento, 2),
            "total": round(total, 2)
        }

        conex.Facturas.insert_one(factura)

        conex.Vehiculos.update_one(
            {"_id": infoF.get("auto_id")},
            {"$inc": {"stock": -1}}
        )

        data = {
            "status_code": 201,
            "status_message": "Factura registrada correctamente",
            "data": factura
        }

    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 201
@app.route('/clientes', methods=['GET'])
def get_clientes():
    try:
        conex = conectionDB()
        clientes =list(conex.Clientes.find({}))
        data ={
            "status_code": 200,
            "status_message": "Lista de autos disponibles",
            "data": clientes
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 200



@app.route('/autos', methods=['GET'])
def get_autos():
    try:
        conex = conectionDB()
        autos = list(conex.Vehiculos.find({}))
        data = {
            "status_code": 200,
            "status_message": "Lista de autos disponibles",
            "data": autos
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 200

@app.route('/facturas', methods=['GET'])
def get_facturas():
    try:
        conex = conectionDB()
        facturas = list(conex.Facturas.find({}))
        data = {
            "status_code": 200,
            "status_message": "Facturas registradas",
            "data": facturas
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 200

@app.route('/factura/<id>', methods=['GET'])
def get_factura_especifica(id):
    try:
        conex = conectionDB()
        factura = conex.Facturas.find_one({"_id": id})

        if not factura:
            return jsonify("Factura no encontrada"), 404

        data = {
            "status_code": 200,
            "status_message": "Factura encontrada",
            "data": factura
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 200


@app.route('/clientes/<id>', methods=['GET'])
def get_cliente_especifico(id):
    try:
        conex = conectionDB()
        Clientes = conex.Clientes.find_one({"_id": id})

        if not Clientes:
            return jsonify("Factura no encontrada"), 404

        data = {
            "status_code": 200,
            "status_message": "Factura encontrada",
            "data": Clientes
        }
    except Exception as e:
        print(e)
        abort(500)

    return jsonify(data), 200

if __name__ == '__main__':
    HOST = '0.0.0.0'
    PORT = 5000
    app.run(HOST, PORT)