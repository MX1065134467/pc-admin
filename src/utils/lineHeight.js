import Quill from 'quill'
const Parchment = Quill.import('parchment')
class lineHeightAttributor extends Parchment.Attributor.Style {}
// eslint-disable-next-line new-cap
const lineHeightStyle = new lineHeightAttributor('lineHeight', 'line-height', { scope: Parchment.Scope.INLINE, whitelist: ['1', '1.5', '1.75', '2', '3', '4', '5'] })

export { lineHeightStyle }
