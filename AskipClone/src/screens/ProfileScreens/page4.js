import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Selector from '../../components/Selector';
import Inputs from '../../components/Inputs';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import {
  Question1,
  // Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Question7
} from '../../assets/dummydata/Questions.json';
import { SET_PAGE_FOUR } from '../../redux/const/const';
import { relevant, update_Fourth_Page, UserDetail } from '../../redux/actions/user.action';
import RelevatorSelector from '../../components/relevatorSelector';
import axios from 'axios';
import { base_URL } from '../../config/config';
import { useEffect } from 'react';

const Page4 = ({ props, setPage, profile }) => {
  const [d1, setd1] = useState();
  const [relevantData, setRelevantData] = useState();
  const dispatch = useDispatch()
  const data = [
    {
      id: 0,
      name: ' ali',
    },
    {
      id: 1,
      name: ' ahmed',
    },
    {
      id: 2,
      name: ' muhammad',
    },
  ];
  const [Q, setQ] = useState('');
  const [Q1, setQ1] = useState('');
  const [Q2, setQ2] = useState('');
  const [Q3, setQ3] = useState('');
  const [Q4, setQ4] = useState('');
  const [Q5, setQ5] = useState('');
  const [Q6, setQ6] = useState('');
  const [Q7, setQ7] = useState('');
  const fourPageData = useSelector((state) => state?.user?.data)
  const USER_DATA = useSelector((state) => state?.auth?.User)
  const revelator = useSelector((state) => state?.user)
  const [detail, setDetail] = useState()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
console.log("details22",detail)
  // useEffect(()=>{



  // },[USER_DATA])
  console.log("first", revelator)
  const PageFourData = (data) => (dispatch) => {
    dispatch({
      type: SET_PAGE_FOUR,
      payload: { ...fourPageData, ...data }

    })

  }

  const savePageFourdata = () => {

    let data = {
      meetLocation: Q,
      disabledWorker: Q1.id == 2 ? false : true,
      relatedRevelateur: Q2._id,
      registeredSPE: Q3.name,
      needSupport: Q4.name,
      futurGoal: Q5.name,
      degreeLevel: Q6.name,
      professionalSituation: Q7.name
    }
    // console.log(data)
    if (data?.meetLocation == undefined || data?.relatedRevelateur == undefined || data?.registeredSPE == undefined || data?.needSupport == undefined || data?.futurGoal == undefined || data?.degreeLevel == undefined || data?.professionalSituation == undefined) {
      return alert("Tous les champs sont obligatoires")
    } else {
      // console.log("ok")
      dispatch(update_Fourth_Page(userId, { ...fourPageData, ...data }, setPage))
      // setPage(5)
    }

  }

  const fetchData = async () => {
    const { data } = await dispatch(relevant())
    // console.log(data,"------------------------------------------")
    setRelevantData(data)
  }
  let QuestionNo2 = relevantData?.data?.findRevelateur
  // console.log(QuestionNo2.filter((i)=>{i?._id=="637f7d7891403ccdae2de110"}),"ghhh",QuestionNo2,profile?.relatedRevelateur, "QQQQQQQQQQQQQQQQQQQQQQQQQ")
// console.log("dtadatdtatattadt", relevantData?.data?.findRevelateur.filter(it => it._id == profile?.relatedRevelateur)[0])

  useEffect(() => {
    fetchData()

  }, [profile,detail])

  useEffect(() => {
    if (profile?.meetLocation !== null) setQ(profile?.meetLocation)
    if (profile?.disabledWorker !== null) {
      if (profile?.disabledWorker?.toString() == "false") {
        setQ1({
          "id": 2,
          "name": "Non"
        })
      } else {
        setQ1({
          "id": 1,
          "name": "Oui"
        })
      }
    }
    if (profile?.relatedRevelateur !== null) {
      const q2Data = relevantData?.data?.findRevelateur.filter(it => it._id == profile?.relatedRevelateur)[0]
      
      // console.log("q2Dataq2Dataq2Dataq2Data",q2Data)
      setQ2(relevantData?.data?.findRevelateur.filter(it => it._id == profile?.relatedRevelateur)[0])
    }
    if (profile?.registeredSPE !== null) {
      const q3Data = Question3.filter(it => it.name == profile?.registeredSPE)[0]
      setQ3(q3Data)
    }
    if (profile?.needSupport !== null) {
      const q4Data = Question4.filter(it => it.name == profile?.needSupport)[0]
      setQ4(q4Data)
    }
    if (profile?.futurGoal !== null) {
      const q5Data = Question5.filter(it => it.name == profile?.futurGoal)[0]
      setQ5(q5Data)
    }
    if (profile?.degreeLevel !== null) {
      const q6Data = Question6.filter(it => it.name == profile?.degreeLevel)[0]
      setQ6(q6Data)
    }
    if (profile?.professionalSituation !== null) {
      const q7Data = Question7.filter(it => it.name == profile?.professionalSituation)[0]
      setQ7(q7Data)
    }
  }, [profile,relevantData])


  const relevator = () => {
    useDispatch(relevant(userId))
  }
  // console.log(Q2, "kfklsafaskdgfkjefjgaskljfglkdsjaglufk")
  return (
    <ScrollView>
      <View style={{ marginTop: height * 0.01 }}>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Où nous sommes-nous rencontrés ?</Text>
          <Inputs
            placeholder="Répondez ici..."
            height={height * 0.045}
            width={width * 0.925}
            widths={width * 0.925}
            heights={height * 0.05}
            value={Q}
            setvalue={setQ}
            defaultValue={detail?.meetLocation}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Tu es un travailleur handicapé?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q1?.name ? <Text
              style={{ color: "black" }}
            >{Q1?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question1}
            customFunction={value => setQ1(value)}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Ton révélateur?</Text>
          <RelevatorSelector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            placeholder={Q2?.firstName == undefined ? <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text> : <Text
                style={{ color: "black" }}
              >{Q2?.firstName + " " + Q2?.lastName}</Text>}
            customFunction={value => setQ2(value)}
            data={QuestionNo2}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Tu es inscrit aux SPE?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q3?.name ? <Text
              style={{ color: "black" }}
            >{Q3?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question3}
            customFunction={value => setQ3(value)}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Tu as besoin d'un accompagnement ?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q4?.name ? <Text
              style={{ color: "black" }}
            >{Q4?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question4}
            customFunction={value => setQ4(value)}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Ton envie pour demain c’est...?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q5?.name ? <Text
              style={{ color: "black" }}
            >{Q5?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question5}
            customFunction={value => setQ5(value)}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Ton niveau de qualification?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q6?.name ? <Text
              style={{ color: "black" }}
            >{Q6?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question6}
            customFunction={value => setQ6(value)}
          />
        </View>
        <View style={styles.mainview}>
          <Text style={styles.txt}>Ta situation professionnelle?</Text>
          <Selector
            boxheight={height * 0.045}
            boxwidth={width * 0.925}
            dropdownwidth={width * 0.92}
            placeholder={Q7?.name ? <Text
              style={{ color: "black" }}
            >{Q7?.name}</Text> : <Text style={{ color: "#afafaf" }} >
              sélectionne une option</Text>}
            data={Question7}
            customFunction={value => setQ7(value)}
          />
        </View>
        <TouchableOpacity
          onPress={() => savePageFourdata()}
          style={styles.touch}>
          <Text style={styles.text2}> Continuer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Page4;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.006,
    // fontWeight: '600',
    fontSize: width * 0.043,
    fontFamily: 'Bebas Neue Pro Bold',
  },
  mainview: {
    marginTop: height * 0.01,
  }, text2: {
    color: '#fdbf18',
    fontSize: width * 0.035,
    fontWeight: '700',
  }, touch: {
    height: height * 0.05,
    borderWidth: 2,
    borderColor: '#fdbf18',
    width: width * 0.65,
    marginTop: height * 0.02,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.009,
  },
});
