export const OPEN_MODAL = 'OPEN_MODAL'

export const openModal = (modalParams) => ({
    type: OPEN_MODAL,
    payload: modalParams,
})