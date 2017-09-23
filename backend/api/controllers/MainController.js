/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MainController = {
  test: function(req, res){
    res.send({
      id: 123,
      msg: 'Nescafe'
    });
  }
}

module.exports = MainController;

