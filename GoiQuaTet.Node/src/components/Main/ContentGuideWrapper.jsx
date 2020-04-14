import React from 'react'
import BaseRouteWrapper from 'BaseComponent/BaseRouteWrapper'
import ContentGuide from './ContentGuide'

export default class ContentGuideWrapper extends BaseRouteWrapper {
    wrapperContent() {
        return (
            <ContentGuide />
        )
    }
}