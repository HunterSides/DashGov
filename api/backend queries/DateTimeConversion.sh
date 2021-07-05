#!/bin/bash
GI=$(curl --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getgovernanceinfo"}' -H 'content-type:text/plain;' http://dashrpc:password@127.0.0.1:9998/)

D0=$(TZ=UTC date --date=$(date));
for block in `seq "$GI.result.nextsuperblock" 16616 $(("$GI.result.lastsuperblock" + (16616*2)))`; 
    do DD=$(TZ=UTC date --date="$(date --date="$D0") +727 hours +5 minutes +2 seconds");
    D0=$DD;
    echo "$block - $DD";
done


D0=$(date --date=$(date)); //sets initial start date to current date 
for block in `seq nextsuperblock 16616 $((lastsuperblock + (16616)))`; 
    do DD=$(date --date="$(date --date="$D0") +727 hours +5 minutes +2 seconds");
    D0=$DD;
    echo "$block - $DD";
done



