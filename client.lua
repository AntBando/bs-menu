local function OpenMenu(data)
    SendNUIMessage({
        action = "OPEN_MENU",
        data = data
    })
    SetNuiFocus(true, true)
end

RegisterNetEvent('bs-menu:client:openMenu')
AddEventHandler('bs-menu:client:openMenu', function(menuItems)
    OpenMenu(menuItems)
end)

RegisterNUICallback('closeMenu', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('triggerEvent', function(data, cb)
    TriggerEvent(data.event, data.args)
    cb('ok')
end)

-- Function to be exported and used by other resources
function bsmenu(data)
    OpenMenu(data)
end

-- Export the function so it can be used by other resources
exports('bsmenu', bsmenu)