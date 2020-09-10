-- Department population

INSERT INTO `employee_tracker`.`department`
(`id`,`name`)
VALUES
(<{id: 1}>,<{name: Sales}>);

INSERT INTO `employee_tracker`.`department`
(`id`,`name`)
VALUES
(<{id: 2}>,<{name: Design}>);


INSERT INTO `employee_tracker`.`department`
(`id`,`name`)
VALUES
(<{id: 3}>,<{name: Web}>);

-- Role population

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 1}>,
<{title: Tech}>,
<{salary: 70000.0000}>,
<{department_id: 3}>);

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 2}>,
<{title: Cashier}>,
<{salary: 30000.0000}>,
<{department_id: 1}>);

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 3}>,
<{title: Developer}>,
<{salary: 50000.0000}>,
<{department_id: 2}>);

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 4}>,
<{title: Customer Service}>,
<{salary: 45000.0000}>,
<{department_id: 1}>);

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 5}>,
<{title: Tech II}>,
<{salary: 80000.0000}>,
<{department_id: 3}>);

INSERT INTO `employee_tracker`.`role`
(`id`,
`title`,
`salary`,
`department_id`)
VALUES
(<{id: 6}>,
<{title: Senior Developer}>,
<{salary: 100000.0000}>,
<{department_id: 2}>);


-- Employee population

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 1}>,
<{first_name: Danny}>,
<{last_name: Steiger}>,
<{role_id: 1}>,
<{manager_id: }>);

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 2}>,
<{first_name: Cristian}>,
<{last_name: Hornedo}>,
<{role_id: 5}>,
<{manager_id: }>);

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 3}>,
<{first_name: Dan}>,
<{last_name: Kaltenbaugh}>,
<{role_id: 6}>,
<{manager_id: }>);

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 4}>,
<{first_name: Tyler}>,
<{last_name: Morgan}>,
<{role_id: 3}>,
<{manager_id: }>);

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 5}>,
<{first_name: Melanie}>,
<{last_name: Torres}>,
<{role_id: 4}>,
<{manager_id: }>);

INSERT INTO `employee_tracker`.`employee`
(`id`,
`first_name`,
`last_name`,
`role_id`,
`manager_id`)
VALUES
(<{id: 6}>,
<{first_name: Oscar}>,
<{last_name: Oses}>,
<{role_id: 2}>,
<{manager_id: }>);
