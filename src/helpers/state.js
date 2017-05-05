function getInitialStore() {
  return {
    address: {
      billing: {
        isLoaded: false,
        isEmpty: true,
        address: {}
      },
      shipping: {
        isLoaded: false,
        isEmpty: true,
        address: {}
      },
      addresses: {
        isLoaded: false,
        isEmpty: true,
        addresses: []
      },
      isFetching: false
    },
    cart: {
      cartItems: {
        isLoaded: false,
        isEmpty: true,
        cart: {
          shipments: []
        }
      },
      message: '',
      isError: false,
      isCartPending: false
    },
    catalog: {
      gridItems: {
        isLoaded: false,
        products: []
      },
      mannequinHeads: {
        isLoaded: false,
        products: []
      },
      product: {
        isLoaded: false,
        product: {}
      },
      categoryItems: {
        isLoaded: false,
        slug: '',
        products: []
      }
    },
    checkout: {
      isPayPal: false,
      paypal: {
        isLoaded: false,
        isEmpty: true,
        tokens: {}
      },
      billing: {
        isSet: false,
        isLoaded: false,
        addressId: null
      },
      shipping: {
        isSet: false,
        isLoaded: false,
        addressId: null
      }
    },
    contact: {
      message: '',
      isSent: false
    },
    orders: {
      order: {
        isLoaded: false,
        order: {}
      },
      message: '',
      isError: false,
      orders: {
        isLoaded: false,
        isEmpty: true,
        isError: false,
        orders: []
      }
    },
    page: {
      headerProps: {
        headerClass: 'colored',
        activeSlug: '/'
      },
      showLoader: true,
      isPending: false,
      isError: false,
      messages: [],
      showMobileNav: false,
      showModal: false,
      modalContent: ''
    },
    user: {
      loggedIn: false,
      profile: {
        isLoaded: false,
        email: '',
        f_name: '',
        l_name: ''
      },
      creditInfo: {
        isLoaded: false,
        totalAmount: {}
      }
    }
  };
}

function setStore(data) {
  const initialStore = getInitialStore();
  return { ...initialStore, ...data };
}

export {
  getInitialStore,
  setStore
};
