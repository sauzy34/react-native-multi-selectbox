import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import { capitalize, isEmpty, find } from 'lodash'
import { View, FlatList, ScrollView, Text } from 'react-native'

import Colors from './src/constants/Colors'
import { Icon, FlexWrapper, TouchableFlex, Toggle, Input, InputWrapper } from './src/components'

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

function SelectBox(props) {
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
      <FlexWrapper
        width="100%"
        direction="row"
        alignItems="center"
        background="#fff"
        viewPadding="12px 10px 12px 0"
        justifyContent="space-between"
        style={{ borderColor: '#dadada', borderBottomWidth: 1 }}>
        {isMulti ? (
          <React.Fragment>
            <TouchableFlex
              hitSlop={hitSlop}
              style={{ flexGrow: 1 }}
              onPress={e => (onMultiSelect ? onMultiSelect(item.id) : null)}>
              {renderLabel(item.item)}
            </TouchableFlex>
            <Toggle
              checked={selectedValues.indexOf(item.id) > -1}
              onTouch={e => (onMultiSelect ? onMultiSelect(item.id) : null)}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TouchableFlex
              hitSlop={hitSlop}
              style={{ flexGrow: 1 }}
              onPress={e => {
                // eslint-disable-next-line no-unused-expressions
                onChange ? onChange(item.item) : null
                setShowOptions(false)
              }}>
              {renderLabel(item.item)}
            </TouchableFlex>
            <FlexWrapper />
          </React.Fragment>
        )}
      </FlexWrapper>
    )
  }

  function groupKeyExtractor(item) {
    return item.toString()
  }

  function renderGroupItem({ item }) {
    const { onTapClose, options } = props
    const label = find(options, o => o.id === item)
    return (
      <FlexWrapper
        direction="row"
        background={props.theme.primary}
        borderRadius="17px"
        viewPadding="5px 5px 5px 10px"
        viewMargin="0 10px 0 0"
        alignItems="center"
        justifyContent="center">
        <Text style={{ fontSize: 10, color: '#fff' }}>{capitalize(label.item)}</Text>
        <TouchableFlex viewMargin="0 0 0 15px" hitSlop={hitSlop} onPress={e => (onTapClose ? onTapClose(item) : null)}>
          <Icon name="closeCircle" fill="#fff" width={21} height={21} />
        </TouchableFlex>
      </FlexWrapper>
    )
  }
  const {
    selectIcon,
    label,
    inputPlaceholder,
    hideInputFilter,
    width,
    viewMargin,
    isMulti,
    options,
    value,
    selectedValues
  } = props
  const filteredSuggestions = options.filter(
    suggestion => suggestion.item.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  )
  return (
    <React.Fragment>
      <FlexWrapper width={width || '100%'} viewMargin={viewMargin}>
        <Text style={{ fontSize: 12, color: 'rgba(60, 60, 67, 0.6)', paddingBottom: 4 }}>{label}</Text>
        <FlexWrapper
          direction="row"
          width="100%"
          style={{ borderColor: '#ddd', borderBottomWidth: 1 }}
          viewPadding="6px 20px 8px 0">
          <View style={{ paddingRight: 20, flexGrow: 1 }}>
            {isMulti ? (
              <FlatList
                data={selectedValues}
                extraData={{ inputValue, showOptions }}
                keyExtractor={groupKeyExtractor}
                renderItem={renderGroupItem}
                horizontal={true}
                initialNumToRender={5}
                maxToRenderPerBatch={20}
                windowSize={10}
                ListEmptyComponent={
                  <TouchableFlex
                    width="100%"
                    style={{ flexGrow: 1 }}
                    hitSlop={hitSlop}
                    onPress={() => setShowOptions(!showOptions)}>
                    <Text style={{ fontSize: 17, color: 'rgba(60, 60, 67, 0.3)' }}>
                      {inputPlaceholder || 'SelectGroup(s)'}
                    </Text>
                  </TouchableFlex>
                }
              />
            ) : (
              <TouchableFlex hitSlop={hitSlop} onPress={() => setShowOptions(!showOptions)}>
                <Text style={{ fontSize: 17, color: isEmpty(value) ? 'rgba(60, 60, 67, 0.3)' : '#000' }}>
                  {capitalize(value) || label}
                </Text>
              </TouchableFlex>
            )}
          </View>
          <TouchableFlex onPress={() => setShowOptions(!showOptions)} hitSlop={hitSlop}>
            {selectIcon ? selectIcon : <Icon name={showOptions ? 'upArrow' : 'downArrow'} fill={Colors.primary} />}
          </TouchableFlex>
        </FlexWrapper>

        {/* Options wrapper */}
        {showOptions && (
          <FlexWrapper
            width="100%"
            style={{
              maxHeight: 180
            }}>
            {!hideInputFilter && (
              <InputWrapper>
                <Input
                  value={inputValue}
                  placeholder={inputPlaceholder || 'Select'}
                  onChangeText={value => setInputValue(value)}
                />
                <Icon name="searchBoxIcon" />
              </InputWrapper>
            )}
            <ScrollView keyboardShouldPersistTaps="always">
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
                ListEmptyComponent={
                  <FlexWrapper width="100%" alignItems="center" viewPadding="4px 0">
                    <Text
                      style={{
                        fontSize: 17,
                        color: 'rgba(60, 60, 67, 0.6)'
                      }}>
                      No results found
                    </Text>
                  </FlexWrapper>
                }
              />
            </ScrollView>
          </FlexWrapper>
        )}
      </FlexWrapper>
    </React.Fragment>
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

export default withTheme(SelectBox)
