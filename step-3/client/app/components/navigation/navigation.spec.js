import { NavigationModule } from './navigation.module'
import { NavigationComponent } from './navigation.component';
import NavigationTemplate from './navigation.html';

console.log(NavigationModule);

describe('Navigation', () => {

  beforeEach(window.module(NavigationModule));

  describe('Component', () => {
    let component = NavigationComponent;

    it('includes the intended template',() => {
      expect(component.template).to.equal(NavigationTemplate);
    });
  });
});
