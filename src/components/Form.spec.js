import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/svelte'

import Form from './Form'

describe('form', () => {
  test('disables and changes the button text on click', async () => {
    const { getByText } = render(Form)
    const button = getByText('Search')

    await fireEvent.click(button)

    expect(button.disabled).toBe(true)
    expect(getByText('Loading')).toBeInTheDocument()
  })

  test('dispatch "fetch" event on click', async () => {
    /**
     * Assert that dispatch('fetch') event has been called
     * with the correct payload.
     */
  })
})