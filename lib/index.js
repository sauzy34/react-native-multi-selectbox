import React, { Component } from 'react'
import { TextInput, View, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native'
import Colors from './src/constants/Colors'
import styled, { withTheme } from 'styled-components'
import Icon from './src/components/Icon'
import { capitalize, isEmpty, find } from 'lodash'

const FlexWrapper = styled(View)`
  flex-direction: ${props => props.direction || 'column'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
  margin: ${props => props.viewMargin || '0px'};
  padding: ${props => props.viewPadding || '0px'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  flex-basis: ${props => props.flexBasis || 'auto'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  background: ${props => props.background || 'transparent'};
  position: ${props => props.position || 'relative'};
  border-radius: ${props => props.borderRadius || '0px'};
  border-width: ${props => props.borderWidth || '0px'};
  border-color: ${props => props.borderColor || '#fff'};
`
const TouchableFlex = styled(TouchableOpacity)`
  flex-direction: ${props => props.direction || 'column'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
  margin: ${props => props.viewMargin || '0px'};
  padding: ${props => props.viewPadding || '0px'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  flex-basis: ${props => props.flexBasis || 'auto'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  background: ${props => props.background || 'transparent'};
  position: ${props => props.position || 'relative'};
  border-radius: ${props => props.borderRadius || '0px'};
  border-width: ${props => props.borderWidth || '0px'};
  border-color: ${props => props.borderColor || '#fff'};
`

const Input = styled(TextInput)`
  padding: 14px 8px 14px 0px;
  color: ${props => props.color || '#000'};
  font-size: 12px;
  flex-grow: 1;
`
const InputWrapper = styled(FlexWrapper)`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  flex-direction: row;
  align-items: center;
  padding-right: 18px;
  justify-content: space-between;
  /* position: relative; */
`

const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 }

class Toggle extends Component {
  render() {
    const { checked, onTouch, ...props } = this.props
    return (
      <TouchableOpacity
        onPress={() => (onTouch ? onTouch() : null)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        {...props}>
        {checked ? <Icon name={'deleteCircle'} /> : <Icon name={'addCircle'} />}
      </TouchableOpacity>
    )
  }
}

class SelectBox extends Component {
  static defaultProps = {
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
  state = {
    inputValue: '',
    showOptions: false
  }
  keyExtractor = item => {
    return item.id.toString()
  }
  renderLabel = item => {
    return <Text style={{ fontSize: 17, color: 'rgba(60, 60, 67, 0.6)' }}>{capitalize(item)}</Text>
  }
  renderItem = ({ item }) => {
    const { isMulti, onChange, onMultiSelect, selectedValues } = this.props
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
              {this.renderLabel(item.item)}
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
                this.setState({ showOptions: false })
              }}>
              {this.renderLabel(item.item)}
            </TouchableFlex>
            <FlexWrapper />
          </React.Fragment>
        )}
      </FlexWrapper>
    )
  }

  groupKeyExtractor = item => {
    return item.toString()
  }

  renderGroupItem = ({ item }) => {
    const { onTapClose, options } = this.props
    const label = find(options, o => o.id === item)
    return (
      <FlexWrapper
        direction="row"
        background={this.props.theme.primary}
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

  render() {
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
    } = this.props
    const { showOptions, inputValue } = this.state
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
                  extraData={this.state}
                  keyExtractor={this.groupKeyExtractor}
                  renderItem={this.renderGroupItem}
                  horizontal={true}
                  initialNumToRender={5}
                  maxToRenderPerBatch={20}
                  windowSize={10}
                  ListEmptyComponent={
                    <TouchableFlex
                      width="100%"
                      style={{ flexGrow: 1 }}
                      hitSlop={hitSlop}
                      onPress={() => this.setState({ showOptions: !showOptions })}>
                      <Text style={{ fontSize: 17, color: 'rgba(60, 60, 67, 0.3)' }}>
                        {inputPlaceholder || 'SelectGroup(s)'}
                      </Text>
                    </TouchableFlex>
                  }
                  // getItemLayout={(data, index) => (
                  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                  // )}
                />
              ) : (
                <TouchableFlex hitSlop={hitSlop} onPress={() => this.setState({ showOptions: !showOptions })}>
                  <Text style={{ fontSize: 17, color: isEmpty(value) ? 'rgba(60, 60, 67, 0.3)' : '#000' }}>
                    {capitalize(value) || label}
                  </Text>
                </TouchableFlex>
              )}
            </View>
            <TouchableFlex onPress={() => this.setState({ showOptions: !showOptions })} hitSlop={hitSlop}>
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
                    onChangeText={value => this.setState({ inputValue: value })}
                  />
                  <Icon name="searchBoxIcon" />
                </InputWrapper>
              )}
              <ScrollView keyboardShouldPersistTaps="always">
                <FlatList
                  data={filteredSuggestions || options}
                  extraData={options}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
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
                  // getItemLayout={(data, index) => (
                  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                  // )}
                />
              </ScrollView>
            </FlexWrapper>
          )}
        </FlexWrapper>
      </React.Fragment>
    )
  }
}

export default withTheme(SelectBox)
