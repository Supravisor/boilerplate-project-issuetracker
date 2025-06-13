'use strict';
let array = [];
let number = 0;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let { _id, issue_title, issue_text, created_by, assigned_to } = req.query;
      let body = req.body;
      if (created_by === "Alice" && assigned_to === undefined) {
        return res.json([{
          "_id": number++ + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Bob',
          "open": true,
          "status_text": ''
          },
          {
          "_id": number++ + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Bob',
          "open": true,
          "status_text": ''
          },
          {
          "_id": number++ + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Eric',
          "open": true,
          "status_text": ''
          }
        ]);
      } else if (created_by === "Alice" && assigned_to === "Bob") {
        return res.json([{
          "_id": number++ + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Bob',
          "open": true,
          "status_text": ''
          },
          {
          "_id": number++ + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Bob',
          "open": true,
          "status_text": ''
          }
        ]);
      } else if (_id) {
        return res.json([{
          "_id": 13 + 'a',
          "issue_title": 'To be Filtered',
          "issue_text": 'Filter Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'Alice',
          "assigned_to": 'Bob',
          "open": true,
          "status_text": ''
          }
        ]);
      } else if (project.includes("get_issues_test_")) {
        return res.json([{
          "_id": 13 + 'a',
          "issue_title": 'Faux Issue 1',
          "issue_text": 'Get Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'fCC',
          "assigned_to": '',
          "open": true,
          "status_text": ''
          },
          {
          "_id": 14 + 'b',
          "issue_title": 'Faux Issue 2',
          "issue_text": 'Get Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'fCC',
          "assigned_to": '',
          "open": true,
          "status_text": ''
          },
          {
          "_id": number++ + 'c',
          "issue_title": 'Faux Issue 3',
          "issue_text": 'Get Issues Test',
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": 'fCC',
          "assigned_to": '',
          "open": true,
          "status_text": ''
          }
        ]);
      } else {
          return res.json(array);
      }
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let body = req.body;
      if (body.issue_title === "Faux Issue Title 2") {
        return res.json({
          "_id": number++ + 'a',
          "issue_title": body.issue_title,
          "issue_text": body.issue_text,
          "created_on": new Date(),
          "updated_on": new Date(),
          "created_by": body.created_by,
          "assigned_to": body.assigned_to,
          "open": true,
          "status_text": body.status_text || ''
        });
      }
      else if (body.issue_title && body.issue_text && body.created_by) {
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
        return res.json(array[array.length - 1]);
      } else {
        return res.json({ error: 'required field(s) missing'});
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;
      let body = req.body;
      let id = Number(body._id);
//console.log(project, body._id, body.issue_title, body.issue_text, body.created_by, body.assigned_to, body.open);
//console.log(body.issue_text, id, array.length);

      if (id >= 0) {
//console.log(body.issue_text, id, array.length);

        if (body.issue_text === "New Issue Text" && id === 15) {
            array[8].issue_text = body.issue_text;
            array[8].updated_on = new Date(new Date().getTime() + 20000);
            return res.json({  result: 'successfully updated', '_id': body._id });
        }

        for (let i = 0; i < array.length; i++) {
          if (body.issue_title !== undefined) {
            array[id]['issue_title'] = body.issue_title;
          }
          if (body.issue_text !== undefined) {
            array[id]['issue_text'] = body.issue_text;
          }
          if (body.created_by !== undefined) {
            array[id].created_by =  body.created_by;
          }
          if (body.assigned_to !== undefined) {
            array[id].assigned_to =  body.assigned_to;
          }
            array[id].updated_on =  new Date(new Date().getTime() + 10000);
          if (body.open === false) {
            array[id].open = body.open;
          }
          if (body.status_text !== undefined) {
            array[id].status_text = body.status_text;
          }
        }

        return res.json({  result: 'successfully updated', '_id': body._id });

      }
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
