'use strict';
let array = [];
let number = 0;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      console.log(project);
      let body = req.body;
      if (body.issue_title && body.issue_text && body.created_by) {
        array.push({
          "_id": number++,
          "issue_title": body.issue_title,
          "issue_text": body.issue_text,
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": body.created_by,
          "assigned_to": body.assigned_to || '',
          "open": true,
          "status_text": body.status_text || ''
        });
        console.log(array);
        return res.json(array[array.length - 1]);
      }

    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
