'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var carouselBuilder = require('*/cartridge/scripts/experience/storefront/carouselBuilder.js');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');

/**
 * Render logic for the storefront.popularCategories.
 *
 * @param {dw.experience.PageScriptContext}
 *            context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model = carouselBuilder.init(model, context);
    model.textHeadline = content.textHeadline ? content.textHeadline : null;
    model.displayRatings = context.content.displayRatings;
    model.swatches = true;

    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    var category = context.content.category;

    if (category) {
        model.categoryId = category.ID;
    }

    var recommender = content.recommender;
    model.limit = parseInt(content.count, 10) || 1;

    if (recommender) {
        model.recommender = recommender.value;
    } else {
        throw new Error(Resource.msg('pd.no.prods.error', 'error', null));
    }

    model.productLoadUrl = URLUtils.abs('EinsteinCarousel-Load');

    model.id = 'carousel-' + PageRenderHelper.safeCSSClass(context.component.getID());
    return new Template('experience/components/storefront/einsteinCarousel').render(model).text;
};