// to calc passing proposal threshold "absolute votes > mn/10"
// funding awarded in order of highest vote ratio
// total budget

/*
    green: passing and will receive funding = fcachedfunding === True  
    yellow: passing but wont be funded (overflow) =
    nocolor: not yet passing =
    red:Not passing AND past trigger (resets if multi-month on next cycle) =
*/
/* green
    fcachedfunding === true 
 */

/* yellow
    if passing === true && fcachedfunding === false 
    setcolor(yellow)
*/
/* red & nocolor
    if passing === false && pastTrigger === true (item.currentblock <== item.nextsuperblock ? false : true) === false 
    setColor(red)
*/

/*
var [passing, setPassing] = useState({})

useEffect (() => {
    (async () => {
        const masternodes = await axios.get("http://142.93.49.98:81/masternodes");
        const masternodesEnabled = masternodes.enabled 
        const passingThreshold = masternodesEnabled / 10
        
        const calcPassing = () => {
            var passing = AbsoluteYesCount > passingThreshold
            setPassing(passing)
        }

        calcPassing(AbsoluteYesCount, passingThreshold)
    })()
  }, [])



style={{
    borderLeftColor:
      fCachedFunding === true
        ? theme.palette.success.main //green
        : passing === true && fCachedFunding === false
        ? theme.palette.warning.main //yellow
        : passing === false && pastTrigger === false 
        ? theme.palette.noInfo.main //nocolor
        : passing === false && pastTrigger === true 
        ? theme.palete.secondary.main //red
  }}

  */
