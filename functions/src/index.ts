import * as functions from 'firebase-functions';
import * as mailchimp from '@mailchimp/mailchimp_marketing';

const FFN = functions.region('europe-west2').https;

/* ---------- MAILCHIMP ---------- */
// Setup with CLI: firebase functions:config:set gmail.email="example@gmail.com" gmail.password="password"

interface MailChimpMemberTag {
    name: string;
    status: 'inactive' | 'active';
}
interface setTagsData {
    email: string;
    tags: MailChimpMemberTag[];
}

const MCListID = 'c6280027b7';
mailchimp.setConfig({
    apiKey: functions.config().mailchimp.apikey,
    server: 'us5',
});

async function getMemberSubHash(email: string): Promise<any> {
    const member = mailchimp.lists.getListMember(MCListID, email);
    return await member;
}
function setMCMemberTags(subHash: string, inputTags: MailChimpMemberTag[]) {
    functions.logger.log('This is tags', inputTags);
    (mailchimp.lists as any).updateListMemberTags(
        MCListID, subHash, { tags: inputTags }
    );
}
exports.applyMailChimpTag = FFN.onCall(async (data: setTagsData) => {
    functions.logger.log('This is data', data, data.tags[0].name);
    let subHash = (await getMemberSubHash(data.email)).id;
    setMCMemberTags(subHash, [{ name: data.tags[0].name, status: 'active' }]);
});
