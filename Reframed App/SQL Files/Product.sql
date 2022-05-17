/*Create a table for Product Listing*/
create table Products(
ProductId int identity(1,1),
ProductName varchar(500),
UserName varchar(500),
ProductDes varchar(2000),
ProductType varchar(500),
ProductShape varchar(500),
ProductMaterial varchar(500),
ProductColour varchar(500),
ProductAmt int,
ProductImg varchar(500) 
)

/*Create procedure to select all information of Product Listing*/
create procedure AllProductInfo as begin select ProductId,ProductName,UserName,ProductDes,ProductType,ProductShape,ProductMaterial,ProductColour,ProductAmt,ProductImg from dbo.Products end

/*Create procedure to add information of the table*/
Create procedure InsertProductInfo(
@ProductName varchar(500),
@UserName varchar(500),
@ProductDes varchar(2000),
@ProductType varchar(500),
@ProductShape varchar(500),
@ProductMaterial varchar(500),
@ProductColour varchar(500),
@ProductAmt int,
@ProductImg varchar(500)) as begin insert into dbo.Products (ProductName,UserName,ProductDes,ProductType,ProductShape,ProductMaterial,ProductColour,
ProductAmt,ProductImg) values (@ProductName,@UserName,@ProductDes,@ProductType,@ProductShape,@ProductMaterial,@ProductColour
,@ProductAmt,@ProductImg) end

/*Create procedure to Update a row in the table*/
Create procedure UpdateProductInfo(@ProductId int ,@ProductName varchar(500),@UserName varchar(500),
@ProductDes varchar(2000),
@ProductType varchar(500),
@ProductShape varchar(500),
@ProductMaterial varchar(500),
@ProductColour varchar(500),
@ProductAmt int,
@ProductImg varchar(500)) as begin update dbo.Products set ProductName=@ProductName,UserName=@UserName,ProductDes=@ProductDes,ProductType=@ProductType,ProductShape=@ProductShape,ProductMaterial=@ProductMaterial,ProductColour=@ProductColour,ProductAmt=@ProductAmt,ProductImg=@ProductImg  where ProductId=@ProductId end

/*Creating Procedure to delete a row in the table*/
Create procedure DeleteProductInfo(@ProductId int) as begin delete from dbo.Products where ProductId=@ProductId end

/*Create a table for Materials*/
Create table Material(
MaterialId int identity(1,1),
MaterialName varchar(500),
)
/*Pre-inserting data into table*/
insert into dbo.Material values('Acetate')
insert into dbo.Material values('Metal')
insert into dbo.Material values('Plastic')
insert into dbo.Material values('Stainless Steel')
insert into dbo.Material values('Titanium')
insert into dbo.Material values('Others')

/*Create procedure to select all information of Materials*/
create procedure AllMaterial as begin select MaterialId, MaterialName from dbo.Material end

/*Create procedure to Add a row in the table*/
Create procedure InsertMaterial(
@MaterialName varchar(500)) as begin insert into dbo.ProductMaterial (MaterialName) values (@MaterialName) end

/*Create procedure to Update a row in the table*/
Create procedure UpdateMaterial(@MaterialId int,@MaterialName varchar(500)) as begin update dbo.ProductMaterial set MaterialName=@MaterialName where MaterialId=@MaterialId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteMaterial(@MaterialId int) as begin delete from dbo.ProductMaterial where MaterialId=@MaterialId end

/*Create a table for Type of Frames*/
create table ListType(
TypeId int identity(1,1),
TypeName varchar(500),
)

/*Pre-inserting data into table*/
insert into dbo.ListType values('Full rimmed')
insert into dbo.ListType values('Half rimmed')
insert into dbo.ListType values('Rimless')
insert into dbo.ListType values('Others')

/*Create procedure to select all information of Type of Frames*/
create procedure AllType as begin select TypeId, TypeName from dbo.ListType end

/*Create procedure to Add a row in the table*/
Create procedure InsertType(
@TypeName varchar(500)) as begin insert into dbo.ListType (TypeName) values (@TypeName) end

/*Create procedure to Update a row in the table*/
Create procedure UpdateType(@TypeId int,@TypeName varchar(500)) as begin update dbo.ListType set TypeName=@TypeName where TypeId=@TypeId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteType (@TypeId int) as begin delete from dbo.ListType where TypeId=@TypeId end

/*Create a table for Colour*/
create table Colour(
ColourId int identity(1,1),
ColourName varchar(500)
)

/*Pre-inserting data into table*/
insert into dbo.Colour values('Black')
insert into dbo.Colour values('White')
insert into dbo.Colour values('Blue')
insert into dbo.Colour values('Brown')
insert into dbo.Colour values('Gold')
insert into dbo.Colour values('Others')

/*Create procedure to select all information of Colour*/
create procedure AllColour as begin select ColourId, ColourName from dbo.Colour end

/*Create procedure to Add a row in the table*/
Create procedure InsertColour(
@ColourName varchar(500)) as begin insert into dbo.Colour (ColourName) values (@ColourName) end

/*Create procedure to Update a row in the table*/
Create procedure UpdateColour(@ColourId int,@ColourName varchar(500)) as begin update dbo.Colour set ColourName=@ColourName where ColourId=@ColourId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteColour (@ColourId int) as begin delete from dbo.Colour where ColourId=@ColourId end

/*Create a table for Shape*/
create table Shape(
ShapeId int identity(1,1),
ShapeName varchar(500)
)

/*Pre-inserting data into table*/
insert into dbo.Shape values('Aviator')
insert into dbo.Shape values('Oval')
insert into dbo.Shape values('Rectangle')
insert into dbo.Shape values('Round')
insert into dbo.Shape values('Square')
insert into dbo.Shape values('Others')

/*Create procedure to select all information of Shape*/
create procedure AllShape as begin select ShapeId, ShapeName from dbo.Shape end

/*Create procedure to Add a row in the table*/
Create procedure InsertShape(
@ShapeName varchar(500)) as begin insert into dbo.Shape (ShapeName) values (@ShapeName) end

/*Create procedure to Update a row in the table*/
Create procedure UpdateShape(@ShapeId int,@ShapeName varchar(500)) as begin update dbo.Shape set ShapeName=@ShapeName where ShapeId=@ShapeId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteShape (@ShapeId int) as begin delete from dbo.Shape where ShapeId=@ShapeId end
