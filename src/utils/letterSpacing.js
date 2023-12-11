import Quill from 'quill'
const Parchment = Quill.import('parchment')
class letterSpacingAttributor extends Parchment.Attributor.Style {}
// eslint-disable-next-line new-cap
const letterSpacingStyle = new letterSpacingAttributor('letterSpacing', 'letter-spacing', { scope: Parchment.Scope.INLINE, whitelist: ['1px', '3px', '5px', '7px', '9px', '11px', '13px'] })

export { letterSpacingStyle }
