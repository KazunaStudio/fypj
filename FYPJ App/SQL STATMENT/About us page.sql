create table dbo.CompanyInformation(
ID int identity(1,1),
CompanyLogo varchar(500),
CompanyName varchar(500),
CompanyDes varchar(5000),
CompanyVision varchar(1000),
CompanyMission varchar(1000),
CompanyValue varchar(1000),
)
drop table dbo.CompanyInformation

insert into dbo.CompanyInformation values
('reframed_logo.png','Reframed',' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra condimentum diam. Proin quis mattis odio, quis bibendum enim. Vestibulum velit dui, lobortis vitae elit in, vehicula pulvinar leo. Mauris sit amet elit auctor, sodales sapien varius, maximus est. Vivamus vel ligula ac magna sollicitudin mollis ut sit amet lorem. Duis ut neque vel magna scelerisque tempus. Donec ipsum ante, finibus imperdiet accumsan ac, convallis sit amet libero. Praesent facilisis gravida metus ac lacinia. Phasellus eget porta libero, ut imperdiet lacus. Sed accumsan justo id ligula feugiat efficitur.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae ante tincidunt, eleifend nulla nec, faucibus nulla. Phasellus vitae dignissim.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at eleifend lacus. Praesent in cursus nisi, venenatis tincidunt magna. Duis.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta sollicitudin mi a ultrices. Duis sagittis id leo sagittis euismod.')
select * from dbo.CompanyInformation

create procedure AllCompanyInfo as begin select * from dbo.CompanyInformation end
Drop Procedure AllCompanyInfo
AllCompanyInfo

Create procedure updateCompanyInfo (@ID int, @CompanyLogo varchar(500), @CompanyName varchar(500), @CompanyDes varchar(5000),
@CompanyVision varchar(1000),
@CompanyMission varchar(1000),
@CompanyValue varchar(1000))
as begin update dbo.CompanyInformation set CompanyLogo=@CompanyLogo,CompanyName=@CompanyName,CompanyDes=@CompanyDes,CompanyVision=@CompanyVision,
CompanyMission=@CompanyMission,CompanyValue=@CompanyValue where ID=@ID
end

drop procedure updateCompanyInfo


create table dbo.Employees(
EmployeeId int identity(1,1),
EmployeeName varchar(500),
EmployeePos varchar(500),
EmployeeImg varchar(500)
)

drop table dbo.Employees
Truncate table dbo.Employees

insert into dbo.Employees values
('Alexsandr Castor','Manager')
insert into dbo.Employees values
('Hayat Agniya','Designer')
insert into dbo.Employees values
('Parthenope Clio','Software Engineer')
select * from dbo.Employees

create procedure AllEmployees as begin select * from dbo.Employees end
Drop Procedure AllEmployees
AllEmployees

Create procedure AddEmployees (@EmployeeName varchar(500), @EmployeePos varchar(500), @EmployeeImg varchar(500))
as begin insert into dbo.Employees (EmployeeName,EmployeePos,EmployeeImg) values (@EmployeeName,@EmployeePos,@EmployeeImg) end
Drop Procedure AddEmployees
AddEmployees

Create procedure updateEmployees (@EmployeeId int,@EmployeeName varchar(500), @EmployeePos varchar(500), @EmployeeImg varchar(500))
as begin update dbo.Employees set EmployeeName=@EmployeeName,EmployeePos=@EmployeePos,EmployeeImg=@EmployeeImg where EmployeeId=@EmployeeId end
Drop Procedure updateEmployees
updateEmployees

Create procedure DeleteEmployee(@EmployeeId int) as begin delete from dbo.Employees where EmployeeId=@EmployeeId end
Drop Procedure DeleteEmployee
