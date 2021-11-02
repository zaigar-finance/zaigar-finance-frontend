import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal } from '@zaigar-finance/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledTeamCard = styled(Card)`
  min-height: 376px;
  min-width: 100%;
  grid-column: 3;
`

const Block = styled.div`
  margin: auto;
  padding: 4px;
  float: left;
  grid-column: 1;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 15 px;
  margin-bottom:16px;
`

const Row = styled.div`
  display: block;
  margin: auto;
  grid-column: 1;
`

const TeamCard = () => {
  const { t } = useTranslation()


  return (
    <StyledTeamCard >
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('Team')}
        </Heading>
        <Row>
        <Block>
        <CardImage src="/images/teamzaigar/team-rui.png" alt="Rui" width={256} height={256} />
        <Label>{t('Rui Braga(Founder/CEO)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-luan.png" alt="Luan" width={256} height={256} />
        <Label>{t('Luan Ítalo(Co-founder/CMO)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-ismael.png" alt="Ismael" width={256} height={256} />
        <Label>{t('Ismael Santos(Growth Director)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-jessika.png" alt="Jessica" width={256} height={256} />
        <Label>{t('Jéssika Lino(Telegram Support)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-renato.png" alt="Renato" width={256} height={256} />
        <Label>{t('Renato Almeida(Project Advisor)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-heslei.png" alt="Heslei" width={256} height={256} />
        <Label>{t('Heslei Oliveira(Com. Director)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-marcelo.png" alt="Marcelo" width={256} height={256} />
        <Label>{t('Marcelo Borges(Financial Director)')}</Label>
        </Block>
        <Block>
        <CardImage src="/images/teamzaigar/team-wallace.jpg" alt="Wallace" width={256} height={256} />
        <Label>{t('Wallace Pinheiro(Dev)')}</Label>
        </Block>
        </Row>
      </CardBody>
    </StyledTeamCard>
  )
}

export default TeamCard
