import { NG2TodoPage } from './app.po';

describe('ng2-todo App', function() {
  let page: NG2TodoPage;

  beforeEach(() => {
    page = new NG2TodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
