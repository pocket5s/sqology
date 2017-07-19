create table if not exists competitors (
  id bigint(20) not null auto_increment,
  name varchar(100) not null,
  vehicle varchar(100),
  email varchar(50),
  address varchar(50),
  city varchar(50),
  state varchar(2),
  zip int(5),
  primary key (id)
);

create table if not exists events (
  id bigint(20) not null auto_increment,
  name varchar(50) not null,
  address varchar(50),
  city varchar(50),
  state varchar(2),
  zip int(5),
  notes varchar(255),
  event_date date,
  scores_posted int(1) default 0,
  primary key (id)
);

create table if not exists iasca_scores(
  id bigint(20) not null auto_increment,
  competitor_id bigint(20) not null,
  event_id bigint(20) not null,
  total int(3),

  primary key (id),
  constraint comp_fk foreign key ( competitor_id ) references competitors (id),
  constraint event_fk foreign key ( event_id ) references events (id)
);

create table if not exists meca_scores(
  id bigint(20) not null auto_increment,
  competitor_id bigint(20) not null,
  event_id bigint(20) not null,
  total decimal(4,2),

  primary key (id),
  constraint comp_fk_meca foreign key ( competitor_id ) references competitors (id),
  constraint event_fk_meca foreign key ( event_id ) references events (id)
);

create table if not exists distances (
  id bigint(20) not null auto_increment,
  competitor_id bigint(20) not null,
  event_id bigint(20) not null,
  total decimal(5,2),

  primary key (id),
  constraint comp_fk_dist foreign key ( competitor_id ) references competitors (id),
  constraint event_fk_dist foreign key ( event_id ) references events (id)
);
