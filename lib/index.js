import React, { useState, memo } from 'react'
import { capitalize, isEmpty, find } from 'lodash'
import { View, FlatList, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'

import Colors from './src/constants/Colors'
import { Icon, Toggle } from './src/components'

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

function SelectBox({ ...props }) {
  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  function keyExtractor(item) {
    return item.id.toString()
  }
  function renderLabel(item) {
    return <Text style={{ fontSize: 17, color: 'rgba(60, 60, 67, 0.6)' }}>{capitalize(item)}</Text>
  }
  function renderItem({ item }) {
    const { isMulti, onChange, onMultiSelect, selectedValues } = props
    return (
      <View
        style={{
          borderColor: '#dadada',
          borderBottomWidth: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          background: '#fff',
          paddingVertical: 12,
          paddingRight: 10,
          justifyContent: 'space-between'
        }}>
        {isMulti ? (
          <>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={{ flexGrow: 1 }}
              onPress={e => {
                return onMultiSelect ? onMultiSelect(item.id) : null
              }}>
              {renderLabel(item.item)}
            </TouchableOpacity>
            <Toggle
              checked={selectedValues.indexOf(item.id) > -1}
              onTouch={e => {
                return onMultiSelect ? onMultiSelect(item.id) : null
              }}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              hitSlop={hitSlop}
              style={{ flexGrow: 1 }}
              onPress={e => {
                // eslint-disable-next-line no-unused-expressions
                setShowOptions(false)
                return onChange ? onChange(item) : null
              }}>
              {renderLabel(item.item)}
              <View />
            </TouchableOpacity>
          </>
        )}
      </View>
    )
  }

  function groupKeyExtractor(item) {
    return item.toString()
  }

  function renderGroupItem({ item }) {
    const { onTapClose, options } = props
    const label = find(options, o => o.id === item)
    return (
      <View
        style={{
          flexDirection: 'row',
          borderRadius: '20px',
          paddingVertical: 5,
          paddingRight: 5,
          paddingLeft: 10,
          marginRight: 4,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.primary,
          flexGrow: 1
        }}>
        <Text style={{ fontSize: 10, color: '#fff' }}>{capitalize(label.item)}</Text>
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          hitSlop={hitSlop}
          onPress={e => (onTapClose ? onTapClose(item) : null)}>
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableOpacity>
      </View>
    )
  }
  const { selectIcon, label, inputPlaceholder, hideInputFilter, width, isMulti, options, value, selectedValues } = props
  const filteredSuggestions = options.filter(
    suggestion => suggestion.item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  )

  function multiListEmptyComponent() {
    return (
      <TouchableOpacity
        width="100%"
        style={{ flexGrow: 1, width: '100%' }}
        hitSlop={hitSlop}
        onPress={() => setShowOptions(!showOptions)}>
        <Text style={{ fontSize: 17, color: 'rgba(60, 60, 67, 0.3)' }}>{inputPlaceholder || 'SelectGroup(s)'}</Text>
      </TouchableOpacity>
    )
  }

  function optionListEmpty() {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: 4
        }}>
        <View>
          <Text
            style={{
              fontSize: 17,
              color: 'rgba(60, 60, 67, 0.6)'
            }}>
            No results found
          </Text>
        </View>
      </View>
    )
  }
  return (
    <>
      <View
        style={{
          width: width || '100%'
        }}>
        <Text style={{ fontSize: 12, color: 'rgba(60, 60, 67, 0.6)', paddingBottom: 4 }}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderColor: '#ddd',
            borderBottomWidth: 1,
            paddingTop: 6,
            paddingRight: 20,
            paddingBottom: 8
          }}>
          <View style={{ paddingRight: 20, flexGrow: 1 }}>
            {isMulti ? (
              <FlatList
                data={selectedValues}
                extraData={{ inputValue, showOptions }}
                keyExtractor={groupKeyExtractor}
                renderItem={renderGroupItem}
                horizontal={true}
                ListEmptyComponent={multiListEmptyComponent}
              />
            ) : (
              <TouchableOpacity hitSlop={hitSlop} onPress={() => setShowOptions(!showOptions)}>
                <Text style={{ fontSize: 17, color: isEmpty(value.item) ? 'rgba(60, 60, 67, 0.3)' : '#000' }}>
                  {capitalize(value.item) || label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setShowOptions(!showOptions)} hitSlop={hitSlop}>
            {selectIcon ? selectIcon : <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={Colors.primary} />}
          </TouchableOpacity>
        </View>

        {/* Options wrapper */}
        {showOptions && (
          <FlatList
            data={filteredSuggestions || options}
            extraData={options}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={1}
            horizontal={false}
            initialNumToRender={5}
            maxToRenderPerBatch={20}
            windowSize={10}
            ListEmptyComponent={optionListEmpty}
            style={{ width: '100%', maxHeight: 180 }}
            ListHeaderComponent={
              <>
                {!hideInputFilter && (
                  <View
                    style={{
                      width: '100%',
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingRight: 18,
                      justifyContent: 'space-between'
                    }}>
                    <TextInput
                      value={inputValue}
                      placeholder={inputPlaceholder || 'Select'}
                      onChangeText={value => setInputValue(value)}
                      style={{
                        paddingVertical: 14,
                        paddingRight: 8,
                        color: '#000',
                        fontSize: 12,
                        flexGrow: 1
                      }}
                    />
                    <Icon name="searchBoxIcon" />
                  </View>
                )}
                <ScrollView keyboardShouldPersistTaps="always" />
              </>
            }
          />
        )}
      </View>
    </>
  )
}

SelectBox.defaultProps = {
  label: 'Label',
  options: [
    { item: 'Afghanistan', id: 'AF' },
    { item: 'land Islands', id: 'AX' },
    { item: 'Albania', id: 'AL' },
    { item: 'Algeria', id: 'DZ' },
    { item: 'American Samoa', id: 'AS' },
    { item: 'AndorrA', id: 'AD' },
    { item: 'Angola', id: 'AO' },
    { item: 'Anguilla', id: 'AI' },
    { item: 'Antarctica', id: 'AQ' },
    { item: 'Antigua and Barbuda', id: 'AG' },
    { item: 'Argentina', id: 'AR' },
    { item: 'Armenia', id: 'AM' },
    { item: 'Aruba', id: 'AW' },
    { item: 'Australia', id: 'AU' },
    { item: 'Austria', id: 'AT' },
    { item: 'Azerbaijan', id: 'AZ' },
    { item: 'Bahamas', id: 'BS' },
    { item: 'Bahrain', id: 'BH' },
    { item: 'Bangladesh', id: 'BD' },
    { item: 'Barbados', id: 'BB' }
  ]
}

export default memo(SelectBox)
