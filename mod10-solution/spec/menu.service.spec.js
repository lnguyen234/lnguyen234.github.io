describe('menuitem', function () {
  var MenuService, $httpBackend, ApiPath;

  beforeEach(module('common'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    MenuService = $injector.get('MenuService');
    ApiPath = $injector.get('ApiPath');
  }));

  it('should return menu item', function () {
    var url = ApiPath + '/menu_items/L/menu_items/0.json';
    // console.log(url);
    $httpBackend.whenGET(url).respond(['Orange Chicken']);
    var short_name = 'L1';

    MenuService.getFavoriteDish(short_name).then(function (response) {
      expect(response).toEqual(['Orange Chicken']);
    });
    $httpBackend.flush();
  });
});