import React from 'react'
import LoginStructure from '../components/login/LoginStructure'

describe('<LoginStructure />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginStructure />)
  })
})