import React, {useState, memo, useMemo, PropsWithoutRef} from 'react';
import {isEmpty, find} from 'lodash';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TextStyle,
  ViewStyle,
  TextInputProps,
  FlatListProps,
  GestureResponderEvent,
} from 'react-native';
import Colors from './src/constants/Colors';
import Icon from './src/components/Icon';
import Toggle from './src/components/Toggle';
import {Color} from 'react-native-svg';

const hitSlop = {top: 14, bottom: 14, left: 14, right: 14};

const kOptionsHeight = {width: '100%', maxHeight: 180};

const kOptionListViewStyle = {
  width: '100%',
  alignItems: 'center',
  paddingVertical: 4,
} as ViewStyle;

const renderItemStyle = {flexShrink: 1};

export type SelectBoxProps = {
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  inputFilterContainerStyle?: ViewStyle;
  inputFilterStyle?: TextStyle;
  optionsLabelStyle?: TextStyle;
  optionContainerStyle?: ViewStyle;
  multiOptionContainerStyle?: ViewStyle;
  multiOptionsLabelStyle?: TextStyle;
  multiListEmptyLabelStyle?: TextStyle;
  listEmptyLabelStyle?: TextStyle;
  selectedItemStyle?: TextStyle;
  listEmptyText?: string;
  selectIcon?: React.ReactNode | React.ReactNode[];
  label?: string;
  inputPlaceholder?: string;
  hideInputFilter?: boolean;
  width?: number | string;
  isMulti?: boolean;
  options?: Item[];
  value?: Item;
  selectedValues?: Item[];
  arrowIconColor?: Color;
  searchIconColor?: Color;
  toggleIconColor?: Color;
  searchInputProps?: TextInputProps;
  multiSelectInputFieldProps?: FlatListProps<Item>;
  onChange?: (item: Item) => void;
  onMultiSelect?: (item: Item) => void;
  onTapClose?: (item: Item) => void;
};

export type Item = {
  id: string | number;
  item: string;
};

function SelectBox({
  labelStyle,
  containerStyle,
  inputFilterContainerStyle,
  inputFilterStyle,
  optionsLabelStyle,
  optionContainerStyle,
  multiOptionContainerStyle,
  multiOptionsLabelStyle,
  multiListEmptyLabelStyle,
  listEmptyLabelStyle,
  selectedItemStyle,
  listEmptyText = 'No results found',
  ...props
}: SelectBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const [showOptions, setShowOptions] = useState(false);

  function renderLabel(item: string) {
    const kOptionsLabelStyle = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      ...optionsLabelStyle,
    };
    return <Text style={kOptionsLabelStyle}>{item}</Text>;
  }

  function renderItem({item}: PropsWithoutRef<{item: Item}>) {
    const {isMulti, onChange, onMultiSelect, selectedValues} = props;
    const kOptionContainerStyle = {
      borderColor: '#dadada',
      borderBottomWidth: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingRight: 10,
      justifyContent: 'space-between',
      ...optionContainerStyle,
    } as ViewStyle;
    return (
      <View style={kOptionContainerStyle}>
        {isMulti ? (
          <>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={renderItemStyle}
              onPress={onPressMultiItem()}>
              {renderLabel(item.item)}
            </TouchableOpacity>
            <Toggle
              iconColor={toggleIconColor}
              checked={selectedValues && selectedValues.indexOf(item) > -1}
              onTouch={onPressMultiItem()}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={renderItemStyle}
              onPress={onPressItem()}>
              {renderLabel(item.item)}
              <View />
            </TouchableOpacity>
          </>
        )}
      </View>
    );

    function onPressMultiItem() {
      return (_e: GestureResponderEvent) =>
        onMultiSelect ? onMultiSelect(item) : null;
    }

    function onPressItem() {
      return (_e: GestureResponderEvent) => {
        setShowOptions(false);
        return onChange ? onChange(item) : null;
      };
    }
  }

  function renderGroupItem({item}: {item: Item}) {
    const {onTapClose, options} = props;
    const label = find(options, o => o.id === item.id);
    const kMultiOptionContainerStyle = {
      flexDirection: 'row',
      borderRadius: 20,
      paddingVertical: 5,
      paddingRight: 5,
      paddingLeft: 10,
      marginRight: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      flexGrow: 1,
      ...multiOptionContainerStyle,
    } as ViewStyle;
    const kMultiOptionsLabelStyle = {
      fontSize: 10,
      color: '#fff',
      ...multiOptionsLabelStyle,
    };
    return (
      <View style={kMultiOptionContainerStyle}>
        <Text style={kMultiOptionsLabelStyle}>{label?.item}</Text>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 15}}
          hitSlop={hitSlop}
          onPress={onPressItem()}>
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableOpacity>
      </View>
    );

    function onPressItem() {
      return (_e: any) => (onTapClose ? onTapClose(item) : null);
    }
  }
  const {
    selectIcon,
    label,
    inputPlaceholder = 'Select',
    hideInputFilter,
    width = '100%',
    isMulti,
    options,
    value,
    selectedValues,
    arrowIconColor = Colors.primary as Color,
    searchIconColor = Colors.primary as Color,
    toggleIconColor = Colors.primary as Color,
    searchInputProps,
    multiSelectInputFieldProps,
  } = props;
  const filteredSuggestions = useMemo(
    () =>
      options?.filter(
        suggestion =>
          suggestion.item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      ),
    [inputValue, options],
  );

  function multiListEmptyComponent() {
    const kMultiListEmptyLabelStyle = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.3)',
      ...multiListEmptyLabelStyle,
    };
    return (
      <TouchableOpacity
        //@ts-ignore
        width="100%"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flexGrow: 1, width: '100%'}}
        hitSlop={hitSlop}
        onPress={onPressShowOptions()}>
        <Text style={kMultiListEmptyLabelStyle}>{inputPlaceholder}</Text>
      </TouchableOpacity>
    );
  }

  function optionListEmpty() {
    const kListEmptyLabelStyle = {
      fontSize: 17,
      color: 'rgba(60, 60, 67, 0.6)',
      ...listEmptyLabelStyle,
    };
    return (
      <View style={kOptionListViewStyle}>
        <Text style={kListEmptyLabelStyle}>{listEmptyText}</Text>
      </View>
    );
  }
  const kLabelStyle = {
    fontSize: 12,
    color: 'rgba(60, 60, 67, 0.6)',
    paddingBottom: 4,
    ...labelStyle,
  };

  const kContainerStyle = {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 8,
    ...containerStyle,
  } as ViewStyle;

  return (
    <>
      <View
        style={{
          width,
        }}>
        <Text style={kLabelStyle}>{label}</Text>
        <View style={kContainerStyle}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{paddingRight: 20, flexGrow: 1}}>
            {isMulti ? (
              <FlatList
                data={selectedValues}
                extraData={{inputValue, showOptions}}
                keyExtractor={keyExtractor()}
                renderItem={renderGroupItem}
                horizontal={true}
                ListEmptyComponent={multiListEmptyComponent}
                {...multiSelectInputFieldProps}
              />
            ) : (
              <TouchableOpacity
                hitSlop={hitSlop}
                onPress={onPressShowOptions()}>
                <Text style={kSelectedItemStyle()}>
                  {value?.item || inputPlaceholder || label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={onPressShowOptions()} hitSlop={hitSlop}>
            {selectIcon ? (
              selectIcon
            ) : (
              <Icon
                name={showOptions ? 'upArrow' : 'downArrow'}
                fill={arrowIconColor}
              />
            )}
          </TouchableOpacity>
        </View>
        {/* Options wrapper */}
        {showOptions && (
          <FlatList
            data={filteredSuggestions || options}
            extraData={options}
            keyExtractor={keyExtractor()}
            renderItem={renderItem}
            numColumns={1}
            horizontal={false}
            initialNumToRender={5}
            maxToRenderPerBatch={20}
            windowSize={10}
            ListEmptyComponent={optionListEmpty}
            style={kOptionsHeight}
            ListHeaderComponent={HeaderComponent()}
          />
        )}
      </View>
    </>
  );

  function keyExtractor() {
    return (o: Item) => `${o.id}-${Math.random()}`;
  }

  function kSelectedItemStyle() {
    return {
      fontSize: 17,
      color: isEmpty(value?.item) ? 'rgba(60, 60, 67, 0.3)' : '#000',
      ...selectedItemStyle,
    };
  }

  function HeaderComponent() {
    const kInputFilterContainerStyle = {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 18,
      justifyContent: 'space-between',
      ...inputFilterContainerStyle,
    } as ViewStyle;
    const kInputFilterStyle = {
      paddingVertical: 14,
      paddingRight: 8,
      color: '#000',
      fontSize: 12,
      flexGrow: 1,
      ...inputFilterStyle,
    };
    return (
      <>
        {!hideInputFilter && (
          <View style={kInputFilterContainerStyle}>
            <TextInput
              value={inputValue}
              placeholder={inputPlaceholder}
              onChangeText={onChangeText()}
              style={kInputFilterStyle}
              placeholderTextColor="#000"
              {...searchInputProps}
            />
            <Icon name="searchBoxIcon" fill={searchIconColor} />
          </View>
        )}
        <ScrollView keyboardShouldPersistTaps="always" />
      </>
    );

    function onChangeText() {
      return (val: string) => setInputValue(val);
    }
  }

  function onPressShowOptions() {
    return () => setShowOptions(!showOptions);
  }
}

SelectBox.defaultProps = {
  label: 'Label',
  options: [
    {
      item: 'Aston Villa FC',
      id: 'AVL',
    },
    {
      item: 'West Ham United FC',
      id: 'WHU',
    },
    {
      item: 'Stoke City FC',
      id: 'STK',
    },
    {
      item: 'Sunderland AFC',
      id: 'SUN',
    },
    {
      item: 'Everton FC',
      id: 'EVE',
    },
    {
      item: 'Tottenham Hotspur FC',
      id: 'TOT',
    },
    {
      item: 'Manchester City FC',
      id: 'MCI',
    },
    {
      item: 'Chelsea FC',
      id: 'CHE',
    },
    {
      item: 'West Bromwich Albion FC',
      id: 'WBA',
    },
    {
      item: 'Liverpool FC',
      id: 'LIV',
    },
    {
      item: 'Arsenal FC',
      id: 'ARS',
    },
    {
      item: 'Manchester United FC',
      id: 'MUN',
    },
    {
      item: 'Newcastle United FC',
      id: 'NEW',
    },
    {
      item: 'Norwich City FC',
      id: 'NOR',
    },
    {
      item: 'Watford FC',
      id: 'WAT',
    },
    {
      item: 'Swansea City FC',
      id: 'SWA',
    },
    {
      item: 'Crystal Palace FC',
      id: 'CRY',
    },
    {
      item: 'Leicester City FC',
      id: 'LEI',
    },
    {
      item: 'Southampton FC',
      id: 'SOU',
    },
    {
      item: 'AFC Bournemouth',
      id: 'BOU',
    },
  ],
};

export default memo(SelectBox);
