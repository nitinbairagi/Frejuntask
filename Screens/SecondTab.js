import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Dummy} from '../Helper/dummydata';
import Icon from 'react-native-vector-icons/Ionicons';
const SecondTab = () => {
  const [Newdata, setnewdata] = useState(Dummy);
  const [asecinding, setasecinding] = useState(true);
  const [priceAsec, setpriceAsec] = useState(true);
  const [input, setinput] = useState('');
  console.log('qweqw', priceAsec);

  const SearchHandler = text => {
    if (text) {
      setinput(text);
      const newData = Newdata.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setnewdata(newData);
    } else {
      console.log('sds');
      setnewdata(Dummy);
    }
  };
  const sortHandlerAsecnding = () => {
    const data = Newdata.sort((a, b) => {
      return (
        b.title.toLowerCase().charCodeAt(0) -
        a.title.toLowerCase().charCodeAt(0)
      );
    });
    setnewdata(() => data);
    setasecinding(!asecinding);
  };
  const sortHandlerAsecndingbyprice = () => {
    const data = Newdata.sort((a, b) => {
      return b.price - a.price;
    });
    console.log(data);

    setnewdata(data);
    setpriceAsec(!priceAsec);
  };
  const sortHandlerdesecndingbyPrice = () => {
    const data = Newdata.sort((a, b) => {
      return a.price - b.price;
    });
    console.log('d', data);

    setnewdata(data);
    setpriceAsec(!priceAsec);
  };
  const sortHandlerdesecnding = () => {
    const data = Newdata.sort((a, b) => {
      return (
        a.title.toLowerCase().charCodeAt(0) -
        b.title.toLowerCase().charCodeAt(0)
      );
    });
    setnewdata(() => data);
    setasecinding(!asecinding);
  };
  const clearHandler = () => {
    setnewdata(Dummy);
    setinput('');
  };

  const itemHandler = data => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          margin: 10,
          flexDirection: 'row',
          overflow: 'hidden',
          height: 100,
          borderRadius: 20,
          backgroundColor: '#ffffff',
          borderColor: '#ffffff',
          elevation: 3,
        }}>
        <Image
          resizeMode="center"
          source={{uri: data.item.images[0]}}
          style={{marginLeft: 10, width: 80, height: 90}}
        />
        <Text>{data.item.title}</Text>
        <Text style={{marginRight: 10}}>{data.item.price}</Text>
      </View>
    );
  };
  return (
    <>
      <View style={{margin: 5}}>
        <TextInput
          // editable={false}
          // selectTextOnFocus={false}
          value={input}
          placeholder="Search Items"
          onChangeText={SearchHandler}
          style={{
            borderWidth: 1,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            borderColor: '#ffffff',
            elevation: 5,
            height: 40,
            margin: 5,
          }}
        />

        <TouchableOpacity
          onPress={clearHandler}
          style={{position: 'relative', left: 310, top: -40, elevation: 3}}>
          <Icon size={30} color="#000000" name={'close-outline'} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={asecinding ? sortHandlerAsecnding : sortHandlerdesecnding}
            style={styles.textinput}>
            <Text>{!asecinding ? 'Sort By (A - Z)' : 'Sort by (Z - A)'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              priceAsec
                ? sortHandlerAsecndingbyprice
                : sortHandlerdesecndingbyPrice
            }
            style={[styles.textinput, {width: 150}]}>
            <Text>
              {!priceAsec ? 'Sort by Low Price' : 'Sort by High Price'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList data={Newdata} renderItem={itemHandler} />
    </>
  );
};

const styles = StyleSheet.create({
  textinput: {
    margin: 5,
    width: 150,
    height: 40,
    marginTop: -20,
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
});
export default SecondTab;
