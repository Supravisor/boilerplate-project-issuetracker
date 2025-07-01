const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite( 'POST /api/issues/{project} => object with issue data', ( ) => {

      test( 'Create an issue with every field', ( done ) => {
        chai.request( server )
          .post( '/api/issues/test' )
          .set( 'content-type', 'application/x-www-form-urlencoded' )
          .send( {
            issue_title : 'Title',
            issue_text  : 'Text',
            created_by  : 'You',
            assigned_to : 'Me',
            status_text : 'To update'
          } )
          .end( ( err,res ) => {
            assert.equal( res.status, 200 );
            assert.property( res.body, '_id' );
            assert.property( res.body, 'issue_title' );
            assert.include( res.body['issue_title'], 'Title' );
            assert.property( res.body, 'issue_text'  );
            assert.include( res.body['issue_text'], 'Text' );
            assert.property( res.body, 'created_by' );
            assert.include( res.body['created_by'], 'You' );
            assert.property( res.body, 'assigned_to' );
            assert.include( res.body['assigned_to'], 'Me' );
            assert.property( res.body, 'status_text' );
            assert.include( res.body['status_text'], 'To update' );
            assert.property( res.body, 'open');
            assert.isTrue( res.body['open'] );
            firstId = res.body._id;
            done( );
          } );
      } );


    });

});
