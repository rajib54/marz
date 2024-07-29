from flask import Blueprint
from api.models import PRODUCT_STATUSES
from api.schemas import ProductSchema
from .handlers import get_all_products_from_db, get_all_products_by_status_from_db

products_blueprint = Blueprint('products_blueprint', __name__)

@products_blueprint.route('/', methods=['GET'])
def get_all_products():
    product_schema = ProductSchema(many=True)
    products = get_all_products_from_db()
    if products is None:
        return { 'data': [], 'message': 'No products found' }, 400
    products_serialized = product_schema.dump(products)
    return { 'data': products_serialized }, 200

@products_blueprint.route('/active', methods=['GET'])
def get_all_active_products():
    product_schema = ProductSchema(many=True)
    products = get_all_products_by_status_from_db(PRODUCT_STATUSES["Active"])
    if products is None:
        return { 'data': [], 'message': 'No products found' }, 400
    products_serialized = product_schema.dump(products)
    return { 'data': products_serialized }, 200