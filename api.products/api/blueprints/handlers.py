import logging
from api.models import Product

logger = logging.getLogger(__name__)

def get_all_products_from_db():
    try:
        return Product.select().dicts()
    except Exception as err:
        logger.error(str(err))
        return None

def get_all_products_by_status_from_db(status):
    try:
        return Product.select().where(Product.ProductStatus == status).dicts()
    except Exception as err:
        logger.error(str(err))
        return None