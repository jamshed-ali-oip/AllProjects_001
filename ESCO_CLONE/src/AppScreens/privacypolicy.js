import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const Privacypolicy = () => {



    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                        Privacy Policy
                    </Text>

                </View>
                <View style={styles.container}>
                    <Text style={styles.mainheading}>
                        Terms and Conditions
                    </Text>
                    <Text style={styles.text}>
                        Welcome to IATDOOR!

                        These terms and conditions outline the rules and regulations for the use of IATDOOR’s Website & App, located at https://iatdoor.com/.

                        By accessing this Website & App we assume you accept these terms and conditions. Do not continue to use IATDOOR if you do not agree to take all of the terms and conditions stated on this page.

                        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this Website & App and compliant to the Companyâ€™s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Clientâ€™s needs in respect of provision of the Companyâ€™s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular,
                        plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                    </Text>
                    <Text style={styles.title}>
                        Cookies
                    </Text>
                    <Text style={styles.text}>
                        We employ the use of cookies. By accessing IATDOOR, you agreed to use cookies in agreement with the IATDOOR’s Privacy Policy.

                        Most interactive Website & Apps use cookies to let us retrieve the userâ€™s details for each visit. Cookies are used by our Website & App to enable the functionality of certain areas to make
                        it easier for people visiting our Website & App. Some of our affiliate/advertising partners may also use cookies.
                    </Text>
                    <Text style={styles.title}>
                        License
                    </Text>
                    <Text style={styles.text}>
                        Unless otherwise stated, IATDOOR and/or its licensors own the intellectual property rights for all material on IATDOOR. All intellectual property rights are reserved. You may access this from IATDOOR for your own personal use subjected to restrictions set in these terms and conditions.

                        You must not:

                        Republish material from IATDOOR
                        Sell, rent or sub-license material from IATDOOR
                        Reproduce, duplicate or copy material from IATDOOR
                        Redistribute content from IATDOOR
                        Parts of this Website & App offer an opportunity for users to post and exchange opinions and information in certain areas of the Website & App. IATDOOR does not filter, edit, publish or review Comments prior to their presence on the Website & App. Comments do not reflect the views and opinions of IATDOOR,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, IATDOOR shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this Website & App.

                        IATDOOR reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

                        You warrant and represent that:

                        You are entitled to post the Comments on our Website & App and have all necessary licenses and consents to do so;
                        The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;
                        The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
                        The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
                        You hereby grant IATDOOR a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
                    </Text>
                    <Text style={styles.title}>
                        Hyperlinking to our Content
                    </Text>
                    <Text style={styles.text}>
                        The following organizations may link to our Website & App without prior written approval:

                        Government agencies;
                        Search engines;
                        News organizations;
                        Online directory distributors may link to our Website & App in the same manner as they hyperlink to the Website & Apps of other listed businesses; and
                        System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
                        These organizations may link to our home page, to publications or to other Website & App information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking partyâ€™s site.

                        We may consider and approve other link requests from the following types of organizations:

                        commonly-known consumer and/or business information sources;
                        dot.com community sites;
                        associations or other groups representing charities;
                        online directory distributors;
                        internet portals;
                        accounting, law and consulting firms; and
                        educational institutions and trade associations.
                        We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of IATDOOR; and (d) the link is in the context of general resource information.

                        These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking partyâ€™s site.

                        If you are one of the organizations listed in paragraph 2 above and are interested in linking to our Website & App, you must inform us by sending an e-mail to IATDOOR. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website & App, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.

                        Approved organizations may hyperlink to our Website & App as follows:

                        By use of our corporate name; or
                        By use of the uniform resource locator being linked to; or
                        By use of any other description of our Website & App being linked to that makes sense within the context and format of content on the linking partyâ€™s site.
                        No use of IATDOOR’s logo or other artwork will be allowed for linking absent a trademark license agreement.


                    </Text>
                    <Text style={styles.title}>
                        iFrames
                    </Text>
                    <Text style={styles.text}>
                        Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website & App.
                    </Text>
                    <Text style={styles.title}>
                        Content Liability
                    </Text>
                    <Text style={styles.text}>
                        We shall not be hold responsible for any content that appears on your Website & App. You agree to protect and defend us against all claims that is rising on your Website & App. No link(s) should appear on any Website & App that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                    </Text>
                    <Text style={styles.title}>
                        Your Privacy
                    </Text>
                    <Text style={styles.text}>
                        Please read Privacy Policy
                    </Text>
                    <Text style={styles.title}>
                        Reservation of Rights
                    </Text>
                    <Text style={styles.text}>
                        We reserve the right to request that you remove all links or any particular link to our Website & App. You approve to immediately remove all links to our Website & App upon request. We also reserve the right to amen these terms and conditions and itâ€™s linking policy at any time. By continuously linking to our Website & App, you agree to be bound to and follow these linking terms and conditions.
                    </Text>
                    <Text style={styles.title}>
                        Removal of links from our Website & App
                    </Text>
                    <Text style={styles.text}>
                        If you find any link on our Website & App that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.

                        We do not ensure that the information on this Website & App is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the Website & App remains available or that the material on the Website & App is kept up to date.
                    </Text>
                    <Text style={styles.title}>
                        Disclaimer
                    </Text>
                    <Text style={styles.text}>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our Website & App and the use of this Website & App. Nothing in this disclaimer will:

                        limit or exclude our or your liability for death or personal injury;
                        limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                        limit any of our or your liabilities in any way that is not permitted under applicable law; or
                        Exclude any of our or your liabilities that may not be excluded under applicable law.
                        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

                        As long as the Website & App and the information and services on the Website & App are provided free of charge, we will not be liable for any loss or damage of any nature.
                    </Text>
                    <Text style={styles.title}>
                        Refund
                    </Text>
                    <Text style={styles.text}>
                        We will not assess refund or credit requests (if you have purchased our services one time):

                        If you have changed your mind about an item;
                        If you bought an item by mistake;
                        If you do not have sufficient expertise to use the item;
                        If you ask for goodwill; or
                        If you can no longer access the item because it has been removed.
                        We will not give any refund for any kind of purchase on the Website & App.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}
export default Privacypolicy;
const styles = StyleSheet.create({


    Header: {
        height: height * .08,
        width: width * 1,
        backgroundColor: "red",
        // alignItems:"center"
        justifyContent: "center",
        padding: 10
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",

    },
    mainheading:{
        fontSize:25,
        alignSelf:"center",
        fontWeight:"bold",
        color:"black",
        margin:5
    },
    title:{
        fontSize:20,
        fontWeight:"400",
        color:"black",
        margin:5

    },
    text:{
        fontSize:15,
        fontWeight:"400",
        // color:"black"

    },
    container:{
padding:10,
backgroundColor:"white"
    }
    



})