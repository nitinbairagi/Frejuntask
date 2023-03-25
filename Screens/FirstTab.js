import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import {RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useGetAllProductMutation} from '../Redux/api';
import {actions} from '../Redux/apislice/apislice';

const FirstTab = () => {
  const isfocused = useIsFocused();
  // console.log(isfocused);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const Dispatch = useDispatch();
  const [limit, setlimit] = useState(20);
  const [GetAllProduct] = useGetAllProductMutation();
  const [rtkdata, setrtkdata] = useState([]);
  const payload = useSelector(state => state.ListSlice.item);

  const Onrefresh = () => {
    setIsRefreshing(true);
    GetAllProduct(limit).then(res => {
      setrtkdata(res.data.total);
      Dispatch(actions.addlist(res.data));
    });
    setIsRefreshing(false);
  };

  useEffect(() => {
    Onrefresh();
  }, [limit]);
  const ListHandler = data => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          borderColor: '#ffffff',
          elevation: 5,
        }}>
        <Image
          resizeMode="contain"
          source={{uri: data.item.images[0]}}
          style={{width: 320, height: 150}}
        />
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
          {data.item.title}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
          {data.item.price}
        </Text>
      </View>
    );
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        {payload.length ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={Onrefresh} />
            }
            ListFooterComponent={() => {
              return (
                <>
                  {payload?.length === limit ? (
                    <TouchableOpacity
                      onPress={() => {
                        setlimit(limit + 20);
                      }}
                      style={{
                        margin: 5,
                        padding: 5,
                        width: 90,
                        height: 30,
                        justifyContent: 'center',
                        borderWidth: 1,
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: 10,
                        elevation: 5,
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                      }}>
                      <View>
                        <Text style={{textAlign: 'center'}}>Load More</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {payload.length < rtkdata ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <View>
                          <Text>No more content to show </Text>
                        </View>
                      )}
                    </View>
                  )}
                </>
              );
            }}
            data={payload}
            renderItem={ListHandler}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </>
  );
};

export default FirstTab;
