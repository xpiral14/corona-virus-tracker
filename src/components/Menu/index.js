import React from 'react'
import { Container, MenuItem, MenuContainer } from './style'

export default function Menu() {
    return (
        <Container>
            <MenuContainer>
                <MenuItem to = "/">
                    Situação em todos os países
                </MenuItem>
                <MenuItem to = "/comparacao">
                    Comparação entre países
                </MenuItem>
            </MenuContainer>
        </Container>
    )
}
