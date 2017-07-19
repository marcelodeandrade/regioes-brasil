import { RegioesBrasilPage } from './app.po';

describe('regioes-brasil App', function() {
  let page: RegioesBrasilPage;

  beforeEach(() => {
    page = new RegioesBrasilPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
