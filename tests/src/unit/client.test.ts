import axios from 'axios';
import { expect } from 'chai';
import * as sinon from 'sinon';

import StrongPointClient from '../../../src/client';
import partialMockOf from '../../infrastructure/mockOf';
import { defineEndpoint, EndpointDefinition, Empty } from '../../../src/shared';
import { Product } from '../../fixtures';
import * as fixtures from '../../fixtures';

describe('client', () => {
  describe('StrongPointClient', () => {
    let products: Product[];
    let getProducts: EndpointDefinition<Empty, Empty, Product>;
    let axiosMock: typeof axios;

    beforeEach(() => {
      products = fixtures.getProducts();
      getProducts = defineEndpoint('/products');

      axiosMock = partialMockOf<typeof axios>({
        request: sinon.stub().returns(Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: fixtures.getProducts()
        }))
      });
    });

    it('should make requests through axios', async () => {
      const client = new StrongPointClient({
        axios: axiosMock
      });

      const response = await client.fetch(getProducts);

      expect(axiosMock.request).to.have.been.calledWith({
        method: 'GET',
        url: '/products'
      });
      expect(response).to.have.property('body').deep.equals(products);
      expect(response).to.have.property('statusCode').deep.equals(200);
      expect(response).to.have.property('statusText').deep.equals('OK');
      expect(response).to.have.property('body').deep.equals(products);
    });
  });
});
