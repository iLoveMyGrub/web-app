// describe('AccountService', function() {
//
//   var AccountService;
//   var $httpBackend;
//   var $injector;
//
//   var mockedResponse = [
//     {
//       'id': '08ebe2b9-1697-11e6-9398-0242ac110003',
//       'value': 13700,
//       'mileage': 10000,
//       'expiration': '2016-06-09T11:07:48+0100',
//       'requested': '2016-05-10T11:07:42+0100',
//       'status': true,
//       'vehicle':
//       {
//         'manufacturer': 'CHRYSLER',
//         'model': '300C DIESEL SALOON',
//         'range': '300C',
//         'transmission': 'Automatic',
//         'fuelType': 'gulp Diesel',
//         'doors': '4',
//         'image': 'http:\/\/api.seat\/api\/v1\/valuation\/08ebe2b9-1697-11e6-9398-0242ac110003\/image'
//       }
//     },
//     {
//       'id': '5b80bb40-1695-11e6-9398-0242ac110003',
//       'value': 3150,
//       'mileage': 60000,
//       'expiration': '2016-06-09T10:55:45+0100',
//       'requested': '2016-05-10T10:55:42+0100',
//       'status': true,
//       'vehicle':
//       {
//         'manufacturer': 'FORD',
//         'model': 'FIESTA HATCHBACK',
//         'range': 'FIESTA',
//         'transmission': 'Manual',
//         'fuelType': 'Petrol',
//         'doors': '5',
//         'image': 'http:\/\/api.seat\/api\/v1\/valuation\/5b80bb40-1695-11e6-9398-0242ac110003\/image'
//       }
//     }
//   ];
//
//   var mockedQuationResponse = [
//     {
//       'id': 11,
//       'vehicle': {
//         'id': 76,
//         'slug': 'toledo-style-advanced-1-2-tsi-110ps',
//         'rangeName': 'Toledo',
//         'metaModel': 'Toledo',
//         'modelName': '',
//         'variantName': 'Style Advanced',
//         'vehicleDescription': 'The family car that deliversa smooth, safe and dynamic drive',
//         'price': '17735.00'
//       }
//     }
//   ];
//
//   beforeEach(function() {
//     module('projectMall');
//
//     inject(function(_$injector_, _AccountService_) {
//       $injector = _$injector_;
//       AccountService = _AccountService_;
//     });
//
//     $httpBackend = $injector.get('$httpBackend');
//   });
//
//   describe('instance', function() {
//     it('should be defined', function() {
//       expect(AccountService).toBeDefined();
//     });
//   });
//
//   describe('account', function() {
//     it('should be defined', function() {
//       expect(AccountService.account).toBeDefined();
//     });
//   });
//
//   describe('account.valuation.list', function() {
//     it('should initially be an empty object', function() {
//       expect(AccountService.account.valuation.list).toEqual({});
//     });
//   });
//
//   describe('account.valuation.isLoaded', function() {
//     it('should initially be set to false', function() {
//       expect(AccountService.account.valuation.isLoaded).toBe(false);
//     });
//   });
//
//   describe('account.valuation.isSaved', function() {
//     it('should initially be set to false', function() {
//       expect(AccountService.account.valuation.isSaved).toBe(false);
//     });
//   });
//
//   describe('account.valuationEmail.sent', function() {
//     it('should initially be set to Idle', function() {
//       expect(AccountService.account.valuationEmail.sent).toEqual('Idle');
//     });
//   });
//
//   describe('account.finance.list', function() {
//     it('should initially be an empty object', function() {
//       expect(AccountService.account.finance.list).toEqual({});
//     });
//   });
//
//   describe('account.finance.isLoaded', function() {
//     it('should initially be set to false', function() {
//       expect(AccountService.account.finance.isLoaded).toBe(false);
//     });
//   });
//
//   describe('account.finance.isSaved', function() {
//     it('should initially be set to false', function() {
//       expect(AccountService.account.finance.isSaved).toBe(false);
//     });
//   });
//
//   describe('getValuation() SUCCESS', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/valuation')
//         .respond(200, mockedResponse);
//
//       // Reset
//       AccountService.account.valuation.isLoaded = false;
//
//       AccountService.account.valuation.getValuation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.list).toEqual(mockedResponse);
//       expect(AccountService.account.valuation.isLoaded).toEqual(true);
//       expect(AccountService.account.valuation.isSaved).toBe(true);
//     });
//   });
//
//   describe('getValuation() FAILED', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/valuation')
//         .respond(400, mockedResponse);
//
//       // Reset
//       AccountService.account.valuation.isLoaded = true;
//
//       AccountService.account.valuation.getValuation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.list).toEqual({});
//       expect(AccountService.account.valuation.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('getValuation() SERVER error', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/valuation')
//         .respond(500, mockedResponse);
//
//       // Reset
//       AccountService.account.valuation.isLoaded = true;
//
//       AccountService.account.valuation.getValuation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.list).toEqual({});
//       expect(AccountService.account.valuation.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('saveValuation() SUCCESS', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 'demo1-uid1-123'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/valuation/' + params.id + '/save', params)
//         .respond(200, {
//           'status': true,
//           'message': 'Valuation has been saved successfully'
//         });
//
//       // Reset
//       AccountService.account.valuation.isSaved = false;
//
//       AccountService.account.valuation.saveValuation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.isSaved).toBe(true);
//     });
//   });
//
//   describe('saveValuation() FAIL', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 'demo1-uid1-123'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/valuation/' + params.id + '/save', params)
//         .respond(400, {
//           'status': false,
//           'message': 'Error'
//         });
//
//       // Reset
//       AccountService.account.valuation.isSaved = true;
//
//       AccountService.account.valuation.saveValuation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.isSaved).toBe(false);
//     });
//   });
//
//   describe('saveValuation() SERVER fail', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 'demo1-uid1-123'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/valuation/' + params.id + '/save', params)
//         .respond(500, {
//           'status': false,
//           'message': 'Error'
//         });
//
//       // Reset
//       AccountService.account.valuation.isSaved = true;
//
//       AccountService.account.valuation.saveValuation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuation.isSaved).toBe(false);
//     });
//   });
//
//   describe('saveQuotation() SUCCESS', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 1,
//         term: 12,
//         mileage: 1000,
//         deposit: 250,
//         vid: '3fdb40dd-1daa-11e6-bd4f-0242ac110003'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/finance/save', params)
//         .respond(200, {
//           'status': true,
//           'message': 'Valuation has been saved successfully'
//         });
//
//       // Reset
//       AccountService.account.finance.isSaved = false;
//
//       AccountService.account.finance.saveQuotation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.isSaved).toBe(true);
//     });
//   });
//
//   describe('saveQuotation() FAIL', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 1,
//         term: 12,
//         mileage: 1000,
//         deposit: 250,
//         vid: '3fdb40dd-1daa-11e6-bd4f-0242ac110003'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/finance/save', params)
//         .respond(400, {
//           'status': false,
//           'message': 'Error'
//         });
//
//       // Reset
//       AccountService.account.finance.isSaved = true;
//
//       AccountService.account.finance.saveQuotation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.isSaved).toBe(false);
//     });
//   });
//
//   describe('saveQuotation() SERVER fail', function() {
//     it('should update isSaved when successful', function() {
//
//       var params = {
//         id: 1,
//         term: 12,
//         mileage: 1000,
//         deposit: 250,
//         vid: '3fdb40dd-1daa-11e6-bd4f-0242ac110003'
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/user/finance/save', params)
//         .respond(500, {
//           'status': false,
//           'message': 'Error'
//         });
//
//       // Reset
//       AccountService.account.finance.isSaved = true;
//
//       AccountService.account.finance.saveQuotation(params);
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.isSaved).toBe(false);
//     });
//   });
//
//   describe('fetchQuotation() SUCCESS', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/finance/list')
//         .respond(200, mockedQuationResponse);
//
//       // Reset
//       AccountService.account.finance.isLoaded = false;
//
//       AccountService.account.finance.fetchQuotation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.list).toEqual(mockedQuationResponse);
//       expect(AccountService.account.finance.isLoaded).toEqual(true);
//     });
//   });
//
//   describe('fetchQuotation() FAILED', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/finance/list')
//         .respond(400, {'status': false});
//
//       // Reset
//       AccountService.account.finance.isLoaded = true;
//
//       AccountService.account.finance.fetchQuotation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.list).toEqual({});
//       expect(AccountService.account.finance.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('fetchQuotation() SERVER error', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/finance/list')
//         .respond(500, {'status': false});
//
//       // Reset
//       AccountService.account.finance.isLoaded = true;
//
//       AccountService.account.finance.fetchQuotation();
//       $httpBackend.flush();
//
//       expect(AccountService.account.finance.list).toEqual({});
//       expect(AccountService.account.finance.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('getHistory() SUCCESS', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/history')
//         .respond(200, mockedQuationResponse);
//
//       // Reset
//       AccountService.account.history.isLoaded = false;
//
//       AccountService.account.history.getHistory();
//       $httpBackend.flush();
//
//       expect(AccountService.account.history.list).toEqual(mockedQuationResponse);
//       expect(AccountService.account.history.isLoaded).toEqual(true);
//     });
//   });
//
//   describe('getHistory() FAILED', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/history')
//         .respond(400, {'status': false});
//
//       // Reset
//       AccountService.account.history.isLoaded = true;
//
//       AccountService.account.history.getHistory();
//       $httpBackend.flush();
//
//       expect(AccountService.account.history.list).toEqual({});
//       expect(AccountService.account.history.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('getHistory() SERVER error', function() {
//     it('should update isLoaded when successful', function() {
//       $httpBackend.whenGET('http://localhost:9876/api/v1/user/history')
//         .respond(500, {'status': false});
//
//       // Reset
//       AccountService.account.history.isLoaded = true;
//
//       AccountService.account.history.getHistory();
//       $httpBackend.flush();
//
//       expect(AccountService.account.history.list).toEqual({});
//       expect(AccountService.account.history.isLoaded).toEqual(false);
//     });
//   });
//
//   describe('sendValuationEmail() SUCCESS', function() {
//     it('should set AccountService.account.valuationEmail.sent to Success', function() {
//
//       var valuationId = 'demo1-uid1-123';
//
//       var params = {
//         valuationId: valuationId
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/account/send-valuation-email', params)
//         .respond(200, {
//           'status': true,
//           'message': 'Valuation email has been sent successfully'
//         });
//
//       // Reset
//       AccountService.account.valuationEmail.sent = 'Idle';
//
//       AccountService.account.valuation.sendValuationEmail(valuationId);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuationEmail.sent).toBe('Success');
//     });
//   });
//
//   describe('sendValuationEmail() FAIL', function() {
//     it('should set AccountService.account.valuationEmail.sent to Failure', function() {
//
//       var valuationId = 'demo1-uid1-123';
//
//       var params = {
//         valuationId: valuationId
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/account/send-valuation-email', params)
//         .respond(400, {
//           'status': false,
//           'message': 'Valuation email could not be sent',
//           'error': {code: 400, message: 'Test error message'}
//         });
//
//       // Reset
//       AccountService.account.valuationEmail.sent = 'Idle';
//
//       AccountService.account.valuation.sendValuationEmail(valuationId);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuationEmail.sent).toBe('Failure');
//     });
//   });
//
//   describe('sendValuationEmail() SERVER fail', function() {
//     it('should set AccountService.account.valuationEmail.sent to Failure on status 500', function() {
//
//       var valuationId = 'demo1-uid1-123';
//
//       var params = {
//         valuationId: valuationId
//       };
//
//       $httpBackend.whenPOST('http://localhost:9876/api/v1/account/send-valuation-email', params)
//         .respond(500, {
//           'status': false,
//           'message': 'Valuation email could not be sent'
//         });
//
//       // Reset
//       AccountService.account.valuationEmail.sent = 'Idle';
//
//       AccountService.account.valuation.sendValuationEmail(valuationId);
//       $httpBackend.flush();
//
//       expect(AccountService.account.valuationEmail.sent).toBe('Failure');
//     });
//   });
//
// });
