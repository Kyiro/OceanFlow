import { definePlugin } from "@/lib/plugin";

export default definePlugin({
    name: "PremiumSpoof",
    patches: [
        {
            name: "Change Subscription Type",
            find: /(subscriptionResponse):\s?\(.*\)/g,
            replace: "$1: new Response(JSON.stringify({validUntil:'2040-02-01T12:17:31.256Z',status:'ACTIVE',subscription:{type:'HIFI',offlineGracePeriod:30},highestSoundQuality:'HI_RES',premiumAccess:!0,canGetTrial:!1,paymentType:'PARENT'}),{headers:{'Content-Type':'application/json'}})"
        }
    ]
});