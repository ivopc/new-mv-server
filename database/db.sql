-- Usuários
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `confirmed` tinyint(1) NOT NULL DEFAULT '0',
    `fb_id` varchar(15) NOT NULL,
    `reg_date` char(13) NOT NULL,
    `email` varchar(254) NOT NULL,
    `username` varchar(15) NOT NULL,
    `password` char(60) NOT NULL,
    -- usuário comum = 0 | moderador = 1 | admin = 2
    `rank` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
    `vip` tinyint(1) NOT NULL DEFAULT '0',
    `vip_date` varchar(13) NOT NULL DEFAULT '0',
    `ban` tinyint(1) NOT NULL DEFAULT '0',
    `ban_date` varchar(13) NOT NULL DEFAULT '0',
    `lang` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    KEY `rank` (`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


-- Dados in-game dos players
DROP TABLE IF EXISTS `in_game_data`;
CREATE TABLE IF NOT EXISTS `in_game_data` (
    `user_id` bigint(10) NOT NULL,
    `silver` bigint(10) UNSIGNED NOT NULL DEFAULT '0',
    `gold` bigint(10) UNSIGNED NOT NULL DEFAULT '0',
    `points` bigint(10) UNSIGNED NOT NULL DEFAULT '0',
    `level` bigint(10) NOT NULL,
    `rank` tinyint(1) NOT NULL,
    `exp` bigint(10) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- monstros que estão na party do player
DROP TABLE IF EXISTS `monsters_in_party`;
CREATE TABLE IF NOT EXISTS `monsters_in_party` (
    `user_id` bigint(10) NOT NULL,
    `monster0` bigint(10) NOT NULL,
    `monster1` bigint(10) NOT NULL,
    `monster2` bigint(10) NOT NULL,
    `monster3` bigint(10) NOT NULL,
    `monster4` bigint(10) NOT NULL,
    `monster5` bigint(10) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- monstros que estão ba party do tamer (cpu)
DROP TABLE IF EXISTS `tamer_bot_monsters_in_party`;
CREATE TABLE IF NOT EXISTS `tamer_bot_monsters_in_party` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `tamer_id` smallint(10) NOT NULL,
    `monster0` bigint(10) NOT NULL,
    `monster1` bigint(10) NOT NULL,
    `monster2` bigint(10) NOT NULL,
    `monster3` bigint(10) NOT NULL,
    `monster4` bigint(10) NOT NULL,
    `monster5` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- monstros na monsterbox
DROP TABLE IF EXISTS `monsters_in_box`;
CREATE TABLE IF NOT EXISTS `monsters_in_box` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `slot_position` smallint(10) NOT NULL,
    `monster_id` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- o que o player está fazendo atualmente
DROP TABLE IF EXISTS `current_doing`;
CREATE TABLE IF NOT EXISTS `current_doing` (
    `user_id` bigint(10) NOT NULL,
    -- battle_type:
    -- 0 = nenhuma
    -- 1 = luta contra monstro selvagem (wild)
    -- 2 = luta contra monstros de domador (npc)
    -- 3 = luta contra outro player (PvP) 
    -- 4 = luta contra monstro indomável (de missão)
    `battle_type` tinyint(1) NOT NULL,
    -- 0 = não há batalha pvp | maior que 0 = se for pvp, id da batalha
    `if_is_pvp_battle_id` bigint(10) NOT NULL,
    -- 0 ou 1
    `waiting_wild_battle` tinyint(1) NOT NULL,
    -- 0 ou 1
    `doing_battle_action` tinyint(1) NOT NULL,
    -- 0 ou 1
    `requesting_flag` tinyint(1) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- notificações do player
DROP TABLE IF EXISTS `notify`;
CREATE TABLE IF NOT EXISTS `notify` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    `viewed` tinyint(1) NOT NULL DEFAULT '0',
    -- tipos: 0 = Mensagem Particular | 1 = Aprender move | 2 = Evoluir | 3 = Vendas/Negociações
    `type` tinyint(1) NOT NULL,
    -- notification ID = id de uma das tabelas "notify_learn_move", "notify_evolve"
    `n_id` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- notificação de ensinar move
DROP TABLE IF EXISTS `notify_learn_move`;
CREATE TABLE IF NOT EXISTS `notify_learn_move` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    `used` tinyint(1) NOT NULL DEFAULT '0',
    `move_id` smallint(10) NOT NULL,
    `monster_id` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- notificação de evoluir
DROP TABLE IF EXISTS `notify_evolve`;
CREATE TABLE IF NOT EXISTS `notify_evolve` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    `used` tinyint(1) NOT NULL DEFAULT '0',
    -- monsterpedia_id do monstro para qual vai evoluir
    `evolve_to` smallint(10) NOT NULL,
    `monster_id` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- notificação de trocas/negócios
DROP TABLE IF EXISTS `notify_marketplace`;
CREATE TABLE IF NOT EXISTS `notify_marketplace` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    `item_or_monster` tinyint(1) NOT NULL,
    -- id do item ou monsterpedia_id do monstro que foi vendido
    `solded` int(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- dados gerais de todos os monstros
DROP TABLE IF EXISTS `monsters`;
CREATE TABLE IF NOT EXISTS `monsters` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    -- type:
    -- 0 = monstro do jogador 
    -- 1 = monstro selvagem (wild)
    -- 2 = monstro de domador (npc)
    -- 3 = monstro indomável (de missão)
    `type` tinyint(1) NOT NULL DEFAULT '0',
    `nature` tinyint(1) NOT NULL DEFAULT '0',
    `color_variant` tinyint(1) NOT NULL DEFAULT '0',
    `is_initial` tinyint(1) NOT NULL DEFAULT '0',
    `trade_enabled` tinyint(1) NOT NULL DEFAULT '1',
    `in_pocket` tinyint(1) NOT NULL DEFAULT '0',
    `monsterpedia_id` int(10) NOT NULL,
    `nickname` varchar(9) DEFAULT NULL,
    `level` tinyint(1) NOT NULL,
    `experience` int(10) NOT NULL,
    `gender` tinyint(1) NOT NULL,
    `hold_item` smallint(1) NOT NULL,
    `catch_item` smallint(1) NOT NULL,
    `move_0` smallint(1) NOT NULL,
    `move_1` smallint(1) NOT NULL,
    `move_2` smallint(1) NOT NULL,
    `move_3` smallint(1) NOT NULL,
    `current_HP` int(4) NOT NULL,
    `status_problem` tinyint(1) NOT NULL,
    `stats_HP` int(4) NOT NULL,
    `current_MP` int(4) NOT NULL,
    `stats_MP` int(4) NOT NULL,
    `stats_attack` int(4) NOT NULL,
    `stats_defense` int(4) NOT NULL,
    `stats_speed` int(4) NOT NULL,
    `dp_HP` int(4) NOT NULL,
    `dp_attack` int(4) NOT NULL,
    `dp_defense` int(4) NOT NULL,
    `dp_speed` int(4) NOT NULL,
    `sp_HP` int(4) NOT NULL,
    `sp_attack` int(3) NOT NULL,
    `sp_defense` int(3) NOT NULL,
    `sp_speed` int(3) NOT NULL,
    `vita_HP` int(3) NOT NULL,
    `vita_attack` int(3) NOT NULL,
    `vita_defense` int(3) NOT NULL,
    `vita_speed` int(3) NOT NULL,
    `egg_is` tinyint(1) NOT NULL DEFAULT '0',
    `egg_date` varchar(13) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- itens
DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `item_id` int(10) NOT NULL,
    `amount` int(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    -- tabelas da batalha
-- batalha
DROP TABLE IF EXISTS `battle`;
CREATE TABLE IF NOT EXISTS `battle` (
    `enabled` tinyint(1) NOT NULL,
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    -- se for PvP = inviter
    `user_id` bigint(10) NOT NULL,
    -- 1 = wild | 2 = domador | 3 = PvP | 4 = monstro indomável
    `battle_type` tinyint(1) NOT NULL,
    `field_category` tinyint(1) NOT NULL,
    `field_weather` tinyint(1) NOT NULL,
    `field_special` tinyint(1) NOT NULL,
    -- precisa trocar monstro desmaiado?
    `need_to_trade_fainted_monster` tinyint(1) NOT NULL,
    -- 0 = não é PVP | acima de 0 = id do challenged (`receiver`, aquele que foi desafiado)
    -- e também acima de 0 = id do domador (bot)
    `challenged` bigint(10) NOT NULL,
    -- 0 = não é vs
    -- viu apresentação da batalha?
    `seen_presentation` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- batalha - buffs e nerfs
DROP TABLE IF EXISTS `battle_buffs_nerfs`;
CREATE TABLE IF NOT EXISTS `battle_buffs_debuffs` (
    -- id
    `id` bigint(10) NOT NULL AUTO_INCREMENT,
    -- id da batalha
    `battle_id` bigint(10) NOT NULL,
    -- monstro afetado pelo buff/nerf
    `affected_monster` bigint(10) NOT NULL,
    -- valor q vai acrescentar/tirar no stats
    -- -1 ou +1 | -2 ou +2
    `value` tinyint(1) NOT NULL,
    -- stat que foi afetado
    -- 0 = atk | 1 = def | 2 = speed | 3 = accuracy | 4 = evasion
    `stats_affected` tinyint(1) NOT NULL,
    -- duração de turnos que o stat terá
    -- default = 10
    `duration` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- batalha - EXP share
DROP TABLE IF EXISTS `battle_exp_share`;
CREATE TABLE IF NOT EXISTS `battle_exp_share` (
    -- id
    `id` bigint(10) NOT NULL AUTO_INCREMENT,
    -- user id
    `user_id` bigint(10) NOT NULL,
    -- id da batalha
    `battle_id` bigint(10) NOT NULL,
    -- monstro que está compartilhando o EXP
    `monster_id` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Progresso em geral do jogo
DROP TABLE IF EXISTS `flags`;
CREATE TABLE IF NOT EXISTS `flags` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `type` varchar(2) NOT NULL,
    `flag_id` varchar(10) NOT NULL,
    `value` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- quests
DROP TABLE IF EXISTS `quests`;
CREATE TABLE IF NOT EXISTS `quests` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `quest_id` int(10) NOT NULL,
    `completed` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ações das quests
DROP TABLE IF EXISTS `quest_action`;
CREATE TABLE IF NOT EXISTS `quest_action` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `quest_id` int(10) NOT NULL,
    -- 1 = defeat | 2 = tame | 3 = drop
    `action_type` tinyint(1) NOT NULL,
    -- monstro derrotado/domado
    `monsterpedia_id` int(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- trocas e negócios
DROP TABLE IF EXISTS `marketplace`;
CREATE TABLE IF NOT EXISTS `marketplace` (
    `enabled` tinyint(1) NOT NULL,
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,

    -- Qual o ID do item/monstro que está vendendo?
    `sale_id` bigint(10) NOT NULL,

    -- Se for monstro qual o número do monsterpedia dele?
    `if_is_monster_monsterpedia_id` smallint(10) NOT NULL,

    -- Qual o tipo de negociação?
    -- troca = 0 | venda = 1
    `negotiation_type` tinyint(1) NOT NULL,

    -- Está comerciando item ou monstro?
    -- item = 0 | monstro = 1
    `item_or_monster` tinyint(1) NOT NULL,

    -- Caso a `negotiation_type` seja 'troca', requisitou item ou monstro?
    -- 0 = não é troca | 1 = item | 2 = monstro
    `requested_item_or_monster` tinyint(1) NOT NULL,

    -- Caso a `negotiation_type` seja 'troca', qual ID do item/monstro que requisitou?
    -- 0 = não é troca
    `requested_id` bigint(10) NOT NULL,

    -- Caso a `negotiation_type` seja 'venda', qual tipo de moeda requisitou?
    -- 0 = não é venda | 1 = silver | 2 = gold
    `requested_coin` tinyint(1) NOT NULL,

    -- Caso a `negotiation_type` seja 'venda', qual a quantidade de moedas que pediu?
    -- 0 = não é venda
    `requested_amount` bigint(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- monstros ou itens congelados
DROP TABLE IF EXISTS `freeze_items_monsters`;
CREATE TABLE IF NOT EXISTS `freeze_items_monsters` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,

    -- Qual o ID do item/monstro que está vendendo?
    `sale_id` bigint(10) NOT NULL,

    -- Está comerciando item ou monstro?
    -- item = 0 | monstro = 1
    `item_or_monster` tinyint(1) NOT NULL,

    --
    `amount` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- convite pra pvp 
DROP TABLE IF EXISTS `pvp_invites`;
CREATE TABLE IF NOT EXISTS `pvp_invites` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `inviter` bigint(10) NOT NULL,
    `receiver` bigint(10) NOT NULL,
    -- 0 = não fez a ação de aceitar/recusar | 1 = aceitou | 2 = recusou
    `accepted` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- token de segurança pra entrar no client
DROP TABLE IF EXISTS `security_tokens`;
CREATE TABLE IF NOT EXISTS `security_tokens` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `active` tinyint(1) NOT NULL,
    `token` varchar(150) NOT NULL,
    `last_activity` varchar(13) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- sessão do gameclient
DROP TABLE IF EXISTS `online_offline_flag`;
CREATE TABLE IF NOT EXISTS `online_offline_flag` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `sckt_id` varchar(25) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- pagamentos do picpay
DROP TABLE IF EXISTS `picpay_payment`;
CREATE TABLE IF NOT EXISTS `picpay_payment` (
    `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` bigint(10) NOT NULL,
    `product_id` tinyint(1) NOT NULL,
    `ref` char(10) NOT NULL,
    `value`varchar(100) NOT NULL,
    `status` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- sessão do site
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
    `session_id` varchar(128) COLLATE utf8mb4_bin NOT NULL,
    `expires` int(11) UNSIGNED NOT NULL,
    `data` text COLLATE utf8mb4_bin,
    PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- gebruikers